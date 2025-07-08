using Application.Activities.Queries;
using Application.Core;
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

// Configure CORS (Cross-Origin Resource Sharing) to allow requests from the React frontend
builder.Services.AddCors(options =>
    options.AddPolicy("CorsPolicy",
        builder => builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://localhost:3000") // Allow requests from the React app running on these origins
            .AllowCredentials() // Allow credentials (cookies, authorization headers, etc.)
    )
);

// Register MediatR services from the current assembly
builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssemblyContaining<GetActivityList>());

// Register AutoMapper services from the current assembly
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

// Build the WebApplication instance from the configured builder
var app = builder.Build();

app.UseCors("CorsPolicy"); // Apply the CORS policy to the application

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
