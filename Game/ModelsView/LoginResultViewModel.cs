using Microsoft.AspNetCore.Identity;

using Game.Models;

namespace Game.ModelsView {
  public class LoginResultViewModel {
    public SignInResult Result { get; set; }

    public User User { get; set; }

    public string Token { get; set; }

    public LoginResultViewModel (SignInResult result, ApplicationUser user, string token) {
      Result = result;
      User = new User(user);
      Token = token;
    }
  }
}