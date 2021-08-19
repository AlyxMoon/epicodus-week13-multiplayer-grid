using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Game.Models;
using Game.ModelsView;
using Game.Models.Database;

namespace Game.Controllers
{

  [ApiController]
  [Route("[controller]")]
  public class UserController : Controller
  {
    private readonly DatabaseContext _db;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(
      UserManager<ApplicationUser> userManager,
      DatabaseContext db
    )
    {
      _userManager = userManager;
      _db = db;
    }

    [HttpGet]
    public List<User> Find () {
      return _userManager.Users.Select(user => new User(user)).ToList();
    }

    [HttpPut("{id}/position")]
    public async Task<User> UpdatePositions (string id, UserPositionViewModel positions) {
      ApplicationUser user = await _userManager.FindByIdAsync(id);

      user.PositionX = positions.PositionX;
      user.PositionY = positions.PositionY;

      await _userManager.UpdateAsync(user);
      return new User(user);
    }
  }
}