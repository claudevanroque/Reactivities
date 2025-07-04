using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register the AppDbContext with the dependency injection container
// Configure it to use SQLite as the database provider
// The connection string named "DefaultConnection" is retrieved from appsettings.json or another config source
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers();

// Create a new scope to retrieve scoped services (like DbContext) from the DI container.. DI stands for Dependency Injection
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    // Get the application's DbContext from the service provider
    var context = services.GetRequiredService<AppDbContext>();

    // Apply any pending database migrations automatically at application startup
    await context.Database.MigrateAsync();

    // Seed initial data into the database (e.g., default users, roles, etc.)
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    // If an exception occurs during migration or seeding, log it using the application's logger
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during database migration or seeding.");
}

app.Run();
