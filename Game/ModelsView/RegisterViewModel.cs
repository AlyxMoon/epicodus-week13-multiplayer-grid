using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Game.ModelsView
{
  public class RegisterViewModel
  {
    [Required]
    [EmailAddress]
    [DisplayName("Email")]
    public string Email { get; set; }

    [Required]
    [DisplayName("Username")]
    public string Username { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [DisplayName("Password")]
    public string Password { get; set; }
  }
}