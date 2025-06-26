using Ble.Triviados.Application.Dtos;
using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Application.Interfaces;

public interface IUsuarioJuegoService
{
    Task<UsuarioJuego> RegistrarPuntuacionAsync(int usuarioId, int juegoId, int puntuacion);
    Task<UsuarioJuego?> ObtenerRelacionAsync(int usuarioId, int juegoId);
    Task<IEnumerable<UsuarioJuego>> ObtenerJuegosPorUsuarioAsync(int usuarioId);
    Task<UsuarioJuego?> ActualizarRelacionAsync(UsuarioJuego usuarioJuego);
    Task<IEnumerable<UsuarioRankingDto>> ObtenerRankingDtoPorJuegoAsync(string nombreJuego);
}
