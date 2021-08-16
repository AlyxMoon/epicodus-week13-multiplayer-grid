using Microsoft.AspNetCore.Identity;

namespace Game.Models
{
  public class ApplicationUser : IdentityUser
  {
    public int PositionX { get; set; }
    
    public int PositionY { get; set; }

    public int TotalMoves { get; set; }

    public string PlayerColor { get; set; }
  }
}