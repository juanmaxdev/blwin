using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Domain.Entity.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> RegistrarAsync(Usuario usuario);
        Task<Usuario?> ObtenerPorNombreAsync(string name);
        Task<Usuario?> AgregarPuntosAsync(int id, int puntos);
        Task<List<Usuario>> ObtenerRankingUsuariosAsync();

        Task<int?> ObtenerPuntosPorIdAsync(string userId);


    }
}
