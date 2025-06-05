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
    public class JuegoRepository : IJuegoRepository
    {
        private readonly AppDbContext _context;

        public JuegoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Juego> CrearAsync(Juego juego)
        {
            _context.Juegos.Add(juego);
            await _context.SaveChangesAsync();
            return juego;
        }

        public async Task<Juego?> ObtenerPorIdAsync(int id)
        {
            return await _context.Juegos.FindAsync(id);
        }

        public async Task<Juego?> ObtenerPorNombreAsync(string nombre)
        {
            return await _context.Juegos
                .FirstOrDefaultAsync(j => j.Nombre == nombre);
        }


        public async Task<IEnumerable<Juego>> ObtenerTodosAsync()
        {
            return await _context.Juegos.ToListAsync();
        }
    }
}
