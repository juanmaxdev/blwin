using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using Ble.Triviados.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Infraestructure.Persistence.Repositories
{
    public class UsuarioJuegoRepository : IUsuarioJuegoRepository
    {
        private readonly AppDbContext _context;

        public UsuarioJuegoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UsuarioJuego> RegistrarPuntuacionAsync(UsuarioJuego usuarioJuego)
        {
            _context.UsuarioJuegos.Add(usuarioJuego);
            await _context.SaveChangesAsync();
            return usuarioJuego;
        }

        public async Task<UsuarioJuego?> ObtenerPorUsuarioYJuegoAsync(int usuarioId, int juegoId)
        {
            return await _context.UsuarioJuegos
                .Include(uj => uj.Juego)
                .Include(uj => uj.Usuario)
                .FirstOrDefaultAsync(uj => uj.UsuarioId == usuarioId && uj.JuegoId == juegoId);
        }

        public async Task<IEnumerable<UsuarioJuego>> ObtenerPorUsuarioAsync(int usuarioId)
        {
            return await _context.UsuarioJuegos
                .Include(uj => uj.Juego)
                .Where(uj => uj.UsuarioId == usuarioId)
                .ToListAsync();
        }


        public async Task<UsuarioJuego?> ActualizarRelacionAsync(UsuarioJuego relacion)
        {
            var existente = await _context.UsuarioJuegos.FindAsync(relacion.UsuarioId,relacion.JuegoId);

            if (existente == null)
            {
                return null; 
            }
            _context.Entry(existente).CurrentValues.SetValues(relacion);

            await _context.SaveChangesAsync();

            return existente;
        }

        /// <summary>
        /// Obtiene el ranking de puntuciones de todos los usuarios para un juego en específico, usando el nombre del propio juego
        /// </summary>
        /// <param name="nombreJuego">Nombre del juego que queremos listar</param>
        /// <returns>Lista de relaciones UsuarioJuego ordenadas por puntuación (desc), incluyendo los datos del usuario.</returns>
        public async Task<IEnumerable<UsuarioJuego>> ObtenerRankingPorJuegoAsync(string nombreJuego)
        {
            return await _context.UsuarioJuegos
                .Include(u => u.Usuario)
                .Include(u => u.Juego)
                .Where(u => u.Juego.Nombre == nombreJuego)
                .OrderByDescending(u => u.Puntuacion)
                .ToListAsync();
        }

    }
}
