
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Infraestructure.Persistence.Repositories
{
    public class PartidaRepository : IPartidaRepository
    {
        private readonly TriviadosDbContext _context;

        public PartidaRepository(TriviadosDbContext context)
        {
            _context = context;
        }

        public async Task CrearPartidaAsync(Partida partida)
        {
            _context.Partidas.Add(partida);
            await _context.SaveChangesAsync();
        }

        public async Task ActualizarPartidaAsync(Partida partida)
        {
            _context.Partidas.Update(partida);
            await _context.SaveChangesAsync();
        }

        public async Task<Partida?> ObtenerPorIdAsync(int id)
        {
            return await _context.Partidas
                .Include(p => p.Usuario)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<(string Nombre, int Puntos)>> ObtenerTop10Async()
        {
            var top10 = await _context.Partidas
                .Where(p => p.FechaFin != null)
                .GroupBy(p => p.UsuarioId)
                .Select(g => new
                {
                    UsuarioId = g.Key,
                    MaxPuntos = g.Max(p => p.PuntosPartida)
                })
                .OrderByDescending(x => x.MaxPuntos)
                .Take(10)
                .Join(_context.Usuarios,
                      p => p.UsuarioId,
                      u => u.Id,
                      (p, u) => new { u.Name, p.MaxPuntos })
                .ToListAsync();

            return top10
                .Select(x => (x.Name, x.MaxPuntos))
                .ToList();
        }


        public async Task<(int Posicion, int Puntos)?> ObtenerPosicionUsuarioAsync(int usuarioId)
        {
            var ranking = await _context.Partidas
                .Where(p => p.FechaFin != null)
                .GroupBy(p => p.UsuarioId)
                .Select(g => new
                {
                    UsuarioId = g.Key,
                    MaxPuntos = g.Max(p => p.PuntosPartida)
                })
                .OrderByDescending(x => x.MaxPuntos)
                .ToListAsync();

            var posicion = ranking.FindIndex(x => x.UsuarioId == usuarioId);

            if (posicion == -1)
                return null;

            return (posicion + 1, ranking[posicion].MaxPuntos);
        }

        public async Task<List<Partida>> ObtenerRankingGlobalAsync()
        {
            return await _context.Partidas
                .Include(p => p.Usuario)
                .OrderByDescending(p => p.PuntosPartida)
                .ToListAsync();
        }
        public async Task<List<Partida>> ObtenerPartidasPorUsuarioAsync(int usuarioId)
        {
            return await _context.Partidas
                .Where(p => p.UsuarioId == usuarioId)
                .ToListAsync();
        }

        Task IPartidaRepository.ObtenerPartidasPorUsuarioAsync(int usuarioId)
        {
            return ObtenerPartidasPorUsuarioAsync(usuarioId);
        }


        public async Task<List<Partida>> ObtenerPartidasActivasAsync()
        {
            return await _context.Partidas
                .Include(p => p.Usuario)
                .Where(p => p.VidasRestantes > 0)
                .OrderByDescending(p => p.PuntosPartida)
                .ToListAsync();
        }


    }
}
