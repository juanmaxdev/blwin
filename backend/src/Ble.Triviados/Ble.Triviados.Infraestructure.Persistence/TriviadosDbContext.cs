using Microsoft.EntityFrameworkCore;
using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Infraestructure.Persistence
{
    public class TriviadosDbContext : DbContext
    {
        public TriviadosDbContext(DbContextOptions<TriviadosDbContext> options) : base(options) { }


           // DbSets para las entidades
           public DbSet<Partida> Partidas { get; set; }
           public DbSet<Usuario> Usuarios { get; set; }
           public DbSet<Pregunta> Preguntas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("YourConnectionString",
                    b => b.MigrationsAssembly("Ble.Triviados.Services.WebApi")); // Cambia esto
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Usuario>().HasData(
             new Usuario
             {
                 Id = 1,
                 Name = "usuarioAdmin",
                 Password = "password123",
                 FechaRegistro = new DateTime(2025, 4, 1),
                 Rol = "Admin"
             },
            new Usuario
            {
                Id = 2,
                Name = "Juan",
                Password = "bl1234",
                FechaRegistro = new DateTime(2025, 4, 1),
                Rol = "User"
            });

        }
    }
}
