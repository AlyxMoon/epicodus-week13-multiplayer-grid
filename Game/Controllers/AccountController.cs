using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Game.Models;
using Game.ModelsView;
using Game.Models.Database;

namespace Game.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class AccountController : Controller
  {
    private readonly DatabaseContext _db;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AccountController(
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager,
      DatabaseContext db
    )
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _db = db;
    }

    [HttpPost("register")]
    public async Task<bool> Register(RegisterViewModel model)
    {
      ApplicationUser user = new()
      {
        Email = model.Email,
        UserName = model.Username
      };
      IdentityResult result = await _userManager.CreateAsync(user, model.Password);

      return result.Succeeded;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginViewModel model)
    {
      Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(
        model.Username,
        model.Password,
        isPersistent: true,
        lockoutOnFailure: false
      );

      return result.Succeeded ? RedirectToAction("Index", "Home") : View();
    }

    [HttpGet("logout")]
    public async Task<ActionResult> Logout()
    {
      await _signInManager.SignOutAsync();
      return RedirectToAction("Index", "Home");
    }
  }
}