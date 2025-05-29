using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Domain.Entity.Entities;
using System.Threading.Tasks;

namespace Ble.Triviados.Application.Interfaces
{
    public interface IPartidaService
    {
        Task<int> CrearPartidaAsync(CrearPartidaDto dto);
        Task<bool> ActualizarPartidaAsync(ActualizarPartidaDto dto);
        Task<PartidaDto?> ObtenerPartidaAsync(int id);
        Task<PartidaEstadoDto?> ObtenerEstadoPartidaAsync(int partidaId);
        Task<List<RankingItemDto>> ObtenerRankingAsync(int usuarioId); 
        Task<List<RankingItemDto>> ObtenerTop5Async();
        Task<List<RankingItemDto>> ObtenerRankingPorPartidaAsync(int partidaId);
        Task<List<JugadorActivoDto>> ObtenerJugadoresConPartidaActivaAsync();



    }
}
