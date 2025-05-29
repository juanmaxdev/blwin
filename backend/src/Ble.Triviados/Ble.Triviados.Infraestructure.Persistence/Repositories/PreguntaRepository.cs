using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Infraestructure.Persistence.Repositories
{
    public class PreguntaRepository : IPreguntaRepository
    {
        private readonly TriviadosDbContext _context;

        public PreguntaRepository(TriviadosDbContext context)
        {
            _context = context;
        }

        public async Task<List<Pregunta>> ObtenerPorTematicaAsync(string tematica)
        {
            return await _context.Preguntas
                .Where(p => p.Tema == tematica)
                .ToListAsync();
        }

        public async Task<string?> ObtenerTematicaAleatoriaAsync()
        {
            return await _context.Preguntas
                .Select(p => p.Tema)
                .Distinct()
                .OrderBy(x => Guid.NewGuid())
                .FirstOrDefaultAsync();
        }

        public async Task<string?> ObtenerTematicaAleatoriaEvitandoUltimaAsync(string ultimaTematica)
        {
            return await _context.Preguntas
                .Where(p => p.Tema != ultimaTematica)
                .Select(p => p.Tema)
                .Distinct()
                .OrderBy(x => Guid.NewGuid())
                .FirstOrDefaultAsync();
        }
    }
}
