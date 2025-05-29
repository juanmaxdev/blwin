using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;
using Ble.Triviados.Infraestructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Ble.Triviados.Infraestructure.Persistence.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly TriviadosDbContext _context;

        public UsuarioRepository(TriviadosDbContext context)
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
    }
}
