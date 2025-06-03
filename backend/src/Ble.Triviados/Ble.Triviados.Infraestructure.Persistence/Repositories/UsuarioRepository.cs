using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using Ble.Triviados.Infraestructure.Persistence;
using Ble.Triviados.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Infraestructure.Persistence.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;

        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario> RegistrarAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<Usuario?> ObtenerPorNombreAsync(string name)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(u => u.Name == name);
        }

        public async Task<Usuario?> AgregarPuntosAsync(int usuarioId, int puntosASumar)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == usuarioId);
            if (usuario == null) return null;

            usuario.Puntos += puntosASumar;
            await _context.SaveChangesAsync();
            return usuario;
        }


    }
}
