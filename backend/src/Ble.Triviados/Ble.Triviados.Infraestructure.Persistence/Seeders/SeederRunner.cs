using Ble.Triviados.Infrastructure.Data;

namespace Ble.Triviados.Infraestructure.Persistence.Seeders
{
    public static class SeederRunner
    {
        public static async Task RunAsync(AppDbContext context)
        {
            await UsuarioSeeder.SeedAsync(context);
            // Agregar aquí otros seeders que se creen
        }
    }
}
