using Core.Entities.Identity;
using Core.Enums;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var admin = new AppUser
            {
                DisplayName = "Alex",
                Email = "alex@test.com",
                UserName = "alex@test.com",
                Address = new Address
                {
                    FirstName = "Alex",
                    LastName = "Deno",
                    Street = "10 The Street",
                    City = "New York",
                    State = "NY",
                    ZipCode = "20424"
                }
            };

            var result = await userManager.CreateAsync(admin, "Ad8n$123");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, Roles.Admin.ToString());
            }
            else
            {
                throw new Exception("Failed to create admin user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }
    }

    public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        if (!await roleManager.RoleExistsAsync(Roles.Admin.ToString()))
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.Admin.ToString()));
        }

        if (!await roleManager.RoleExistsAsync(Roles.User.ToString()))
        {
            await roleManager.CreateAsync(new IdentityRole(Roles.User.ToString()));
        }
    }
}
