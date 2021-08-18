using Microsoft.AspNetCore.Identity;

using Game.Models;

namespace Game.ModelsView {
  public class LoginResultViewModel {
    public SignInResult Result { get; set; }

    public ApplicationUser User { get; set; }

    public LoginResultViewModel (SignInResult result, ApplicationUser user) {
      Result = result;
      User = new ApplicationUser () {
        Id = user.Id,
        UserName = user.UserName,
        Email = user.Email,
        PositionX = user.PositionX,
        PositionY = user.PositionY,
        TotalMoves = user.TotalMoves,
        PlayerColor = user.PlayerColor,
      };
    }
  }
}