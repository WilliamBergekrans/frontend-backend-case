using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

// Namespace 
namespace AnagramApi
{
    public class Program
    {
        // Main method. Starts the app. 
        public static void Main(string[] args)
        {
            // Create a host. 
            CreateHostBuilder(args).Build().Run();
        }

        // Method for creating a host. Runs server.
        public static IHostBuilder CreateHostBuilder(string[] args) =>
                Host.CreateDefaultBuilder(args)
                    .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder.UseStartup<Startup>();
                    });
    }
}
