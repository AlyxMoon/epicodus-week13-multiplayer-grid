using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using Game.Models;
using Game.Models.Database;

namespace Game
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllersWithViews();

      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });

      string connection = Configuration["ConnectionStrings:DefaultConnection"];
      ServerVersion version = ServerVersion.AutoDetect(connection);

      services
        .AddDbContext<DatabaseContext>(options => options.UseMySql(connection, version));

      services
        .AddIdentity<ApplicationUser, IdentityRole>()
        .AddEntityFrameworkStores<DatabaseContext>()
        .AddDefaultTokenProviders();

      services
        .AddAuthentication(options =>  {  
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;  
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;  
          options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;  
        })
        .AddJwtBearer(options => {  
            options.SaveToken = true;  
            options.RequireHttpsMetadata = false;  
            options.TokenValidationParameters = new TokenValidationParameters () {  
              ValidateIssuer = false,  
              ValidateAudience = false,   
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))  
            };  
        });  

      services.Configure<IdentityOptions>(options =>
      {
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 8;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredUniqueChars = 0;
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      app
        .UseAuthentication()
        .UseStaticFiles()
        .UseRouting()
        .UseAuthorization()
        .UseEndpoints(endpoints =>
        {
          endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
        })
        .UseSpa(spa =>
        {
          spa.Options.SourcePath = "ClientApp";

          if (env.IsDevelopment())
          {
            spa.UseReactDevelopmentServer(npmScript: "start");
          }
        });
    }
  }
}
