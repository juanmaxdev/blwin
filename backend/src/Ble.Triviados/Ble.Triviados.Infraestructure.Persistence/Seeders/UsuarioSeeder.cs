using Ble.Triviados.Domain.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Infraestructure.Persistence.Seeders
{
    public static class UsuarioSeeder
    {
        public static async Task SeedAsync(TriviadosDbContext context)
        {
            if (!await context.Usuarios.AnyAsync())
            {

                var usuarios = new List<Usuario>
                {
                    new Usuario
                    {
                        Id = 3,
                        Name = "Admin",
                        Password = "password123",
                        FechaRegistro = new DateTime(2025, 4, 1),
                    },
                    new Usuario
                    {
                        Id = 4,
                        Name = "Esther22",
                        Password = "1234",
                        FechaRegistro = new DateTime(2025, 4, 1),
                    }
                };

                context.Usuarios.AddRange(usuarios);
                await context.SaveChangesAsync();
            }
        }
    }
}
