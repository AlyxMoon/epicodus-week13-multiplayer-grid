using Microsoft.AspNetCore.Identity;

using Game.Models;

namespace Game.ModelsView {
  public class RegisterResultViewModel {
    public IdentityResult Result { get; set; }

    public User User { get; set; }

    public RegisterResultViewModel (IdentityResult result, ApplicationUser user) {
      Result = result;
      User = new User(user);
    }
  }
}