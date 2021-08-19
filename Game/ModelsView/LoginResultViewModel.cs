using Microsoft.AspNetCore.Identity;

using Game.Models;

namespace Game.ModelsView {
  public class LoginResultViewModel {
    public SignInResult Result { get; set; }

    public User User { get; set; }

    public LoginResultViewModel (SignInResult result, ApplicationUser user) {
      Result = result;
      User = new User(user);
    }
  }
}