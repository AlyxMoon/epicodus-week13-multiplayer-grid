using Game.Models;

namespace Game.ModelsView {
  public class UserViewModel {
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }

    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int TotalMoves { get; set; }
    public string PlayerColor { get; set; }
 
    public UserViewModel () {}

    public UserViewModel (ApplicationUser user) {
      Id = user.Id;
      UserName = user.UserName;
      Email = user.Email;
      PositionX = user.PositionX;
      PositionY = user.PositionY;
      TotalMoves = user.TotalMoves;
      PlayerColor = user.PlayerColor;
    }
  }
}
