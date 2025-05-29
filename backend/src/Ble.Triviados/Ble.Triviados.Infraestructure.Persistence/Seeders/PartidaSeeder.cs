using Ble.Triviados.Domain.Entity.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Infraestructure.Persistence.Seeders
{
    public static class PartidaSeeder
    {
        public static async Task SeedAsync(TriviadosDbContext context)
        {
            var haceUnaHora = DateTime.UtcNow.AddHours(-1);

            var partidasAntiguas = await context.Partidas
                .Where(p => p.FechaInicio < haceUnaHora && p.VidasRestantes > 0)
                .ToListAsync();

            if (!partidasAntiguas.Any())
            {
                Console.WriteLine("No se encontraron partidas antiguas con vidas restantes.");
                return;
            }

            foreach (var partida in partidasAntiguas)
            {
                partida.VidasRestantes = 0;
            }

            await context.SaveChangesAsync();

            Console.WriteLine($"{partidasAntiguas.Count} partidas antiguas actualizadas con VidasRestantes = 0.");
        }
    }
}
