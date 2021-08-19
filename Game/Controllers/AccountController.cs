using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Linq;
using System.Net.Http.Headers;
using Game.Models;
using Game.ModelsView;

namespace Game.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class AccountController : Controller
  {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;

    public AccountController(
      UserManager<ApplicationUser> userManager, 
      SignInManager<ApplicationUser> signInManager,
      IConfiguration configuration
    )
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _configuration = configuration;
    }

    [HttpGet]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public async Task<UserViewModel> GetAuthenticatedUser ([FromHeader] string authorization) {

      if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue)) {
        string parameter = headerValue.Parameter;
        JwtSecurityTokenHandler handler = new();
        JwtSecurityToken token = handler.ReadJwtToken(parameter);

        string username = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name).Value;

        ApplicationUser user = await _userManager.FindByNameAsync(username);
        return new UserViewModel(user);
      }

      return new UserViewModel();
    }

    [HttpPost("register")]
    public async Task<RegisterResultViewModel> Register(RegisterViewModel model) {
      ApplicationUser user = new()
      {
        Email = model.Email,
        UserName = model.Username
      };

      IdentityResult result = await _userManager.CreateAsync(user, model.Password);

      return new RegisterResultViewModel (result, user);
    }

    [HttpPost("login")]
    public async Task<LoginResultViewModel> Login(LoginViewModel model)
    {
      Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(
        model.Username,
        model.Password,
        isPersistent: true,
        lockoutOnFailure: false
      );

      ApplicationUser currentUser = await _userManager.FindByNameAsync(model.Username);

      List<Claim> authClaims = new () {
        new Claim(ClaimTypes.Name, currentUser.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      };

      SymmetricSecurityKey authSigningKey = new(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

      JwtSecurityToken token = new(   
        expires: DateTime.Now.AddSeconds(2),
        claims: authClaims,
        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)  
        );

      string generatedToken = new JwtSecurityTokenHandler().WriteToken(token);

      return new LoginResultViewModel(result, currentUser, generatedToken);
    }

    [HttpGet("logout")]
    public async void Logout ()
    {
      await _signInManager.SignOutAsync();
    }
  }
}