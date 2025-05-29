using Ble.Triviados.Domain.Entity.Entities;
using System.Threading.Tasks;

namespace Ble.Triviados.Domain.Entity.Interfaces
{
    public interface IPartidaRepository
    {
        Task CrearPartidaAsync(Partida partida);
        Task<Partida?> ObtenerPorIdAsync(int id);
        Task ActualizarPartidaAsync(Partida partida);
        Task<List<(string Nombre, int Puntos)>> ObtenerTop10Async();
        Task<(int Posicion, int Puntos)?> ObtenerPosicionUsuarioAsync(int usuarioId);
        Task<List<Partida>> ObtenerRankingGlobalAsync();
        Task ObtenerPartidasPorUsuarioAsync(int usuarioId);
        Task<List<Partida>> ObtenerPartidasActivasAsync();

    }
}
