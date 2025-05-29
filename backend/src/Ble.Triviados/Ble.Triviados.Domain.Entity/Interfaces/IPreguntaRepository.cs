using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Domain.Entity.Interfaces
{
    public interface IPreguntaRepository
    {
        Task<List<Pregunta>> ObtenerPorTematicaAsync(string tematica);

        Task<string?> ObtenerTematicaAleatoriaAsync();

        Task<string?> ObtenerTematicaAleatoriaEvitandoUltimaAsync(string ultimaTematica);
    }
}
