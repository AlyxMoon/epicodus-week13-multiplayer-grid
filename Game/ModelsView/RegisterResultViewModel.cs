using Microsoft.AspNetCore.Identity;

using Game.Models;

namespace Game.ModelsView {
  public class RegisterResultViewModel {
    public IdentityResult Result { get; set; }

    public UserViewModel User { get; set; }

    public RegisterResultViewModel (IdentityResult result, ApplicationUser user) {
      Result = result;
      User = new UserViewModel(user);
    }
  }
}