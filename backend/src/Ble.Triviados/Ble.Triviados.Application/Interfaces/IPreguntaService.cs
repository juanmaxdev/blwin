using Ble.Triviados.Application.Dtos;

namespace Ble.Triviados.Application.Interfaces
{
    public interface IPreguntaService
    {
        Task<List<PreguntaDto>> ObtenerPreguntasPorTematicaAsync(string tematica);
        Task<string?> ObtenerTematicaAleatoriaAsync();

        Task<string?> ObtenerTematicaAleatoriaEvitandoUltimaAsync(string? ultimaTematica);

    }
}
