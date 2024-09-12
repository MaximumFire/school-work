using Microsoft.AspNetCore.Identity;

namespace CheckAndMate.Data
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string? Nickname { get; set; }
        public string? PreferredTheme { get; set; }
    }
}
