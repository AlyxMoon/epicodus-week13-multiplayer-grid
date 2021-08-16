using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Game.Models.Database
{
  public class ToDoListContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
  {
    DatabaseContext IDesignTimeDbContextFactory<DatabaseContext>.CreateDbContext(string[] args)
    {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      string connection = configuration["ConnectionStrings:DefaultConnection"];
      ServerVersion version = ServerVersion.AutoDetect(connection);

      DbContextOptionsBuilder builder = new DbContextOptionsBuilder<DatabaseContext>();
      builder.UseMySql(connection, version);

      return new DatabaseContext(builder.Options);
    }
  }
}