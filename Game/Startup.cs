using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Game {
  public class Startup {
    public Startup(IConfiguration configuration) {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services) {
      services.AddControllersWithViews();

      services.AddSpaStaticFiles(configuration => {
        configuration.RootPath = "ClientApp/build";
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      }
      else {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      app
        .UseStaticFiles()
        .UseRouting()
        .UseEndpoints(endpoints => {
          endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
        })
        .UseSpa(spa => {
          spa.Options.SourcePath = "ClientApp";

          if (env.IsDevelopment()) {
            spa.UseReactDevelopmentServer(npmScript: "start");
          }
        });
    }
  }
}
