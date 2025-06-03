using Microsoft.EntityFrameworkCore;
using Ble.Triviados.Domain.Entity.Entities;
using Microsoft.Extensions.Configuration;

namespace Ble.Triviados.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Juego> Juegos { get; set; }
        public DbSet<UsuarioJuego> UsuarioJuegos { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public AppDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Usuario>()
                .Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Juego>()
                .Property(j => j.Nombre)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Juego>()
                .Property(j => j.Descripcion)
                .HasMaxLength(500);

            modelBuilder.Entity<UsuarioJuego>()
                .HasKey(uj => new { uj.UsuarioId, uj.JuegoId });

            modelBuilder.Entity<UsuarioJuego>()
                .HasOne(uj => uj.Usuario)
                .WithMany(u => u.UsuarioJuegos)
                .HasForeignKey(uj => uj.UsuarioId);

            modelBuilder.Entity<UsuarioJuego>()
                .HasOne(uj => uj.Juego)
                .WithMany(j => j.UsuariosJuego)
                .HasForeignKey(uj => uj.JuegoId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(@"../Ble.Triviados.Services.WebApi")
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = configuration.GetConnectionString("DefaultConnection");

                optionsBuilder.UseSqlServer(connectionString);
            }
        }
    }
}
