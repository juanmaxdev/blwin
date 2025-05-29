using Ble.Triviados.Domain.Entity.Interfaces;
using Ble.Triviados.Application.Services;
using Ble.Triviados.Domain.Entity.Services;
using Ble.Triviados.Infraestructure.Persistence;
using Ble.Triviados.Infraestructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Ble.Triviados.Application.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Hosting;
using Ble.Triviados.Infraestructure.Persistence.Seeders;

var builder = WebApplication.CreateBuilder(args);

// Configuración de la base de datos
builder.Services.AddDbContext<TriviadosDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Cambia si tu frontend usa otro puerto
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Servicios de dominio / aplicación
// Configuración de JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

//Servicios de dominio / aplicación
builder.Services.AddScoped<IPartidaService, PartidaAppService>();
builder.Services.AddScoped<IPartidaRepository, PartidaRepository>();

// Servicios de usuario
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();

// Servicios de preguntas
builder.Services.AddScoped<IPreguntaService, PreguntaService>();
builder.Services.AddScoped<IPreguntaRepository, PreguntaRepository>();

// Controladores
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Migraciones
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<TriviadosDbContext>();
        context.Database.Migrate(); // Aplica las migraciones pendientes
        await SeederRunner.RunAsync(context); // Ejecuta todos los seeders

    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Error al aplicar migraciones o seeder en la base de datos.");
    }
}

// Middleware de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usa CORS antes de controllers
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
