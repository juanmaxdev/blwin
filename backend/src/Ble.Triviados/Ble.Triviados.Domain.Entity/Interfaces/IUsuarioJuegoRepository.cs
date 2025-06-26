using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Domain.Entity.Interfaces;

public interface IUsuarioJuegoRepository
{
    Task<UsuarioJuego> RegistrarPuntuacionAsync(UsuarioJuego usuarioJuego);
    Task<UsuarioJuego?> ObtenerPorUsuarioYJuegoAsync(int usuarioId, int juegoId);
    Task<IEnumerable<UsuarioJuego>> ObtenerPorUsuarioAsync(int usuarioId);
    Task<UsuarioJuego?> ActualizarRelacionAsync(UsuarioJuego relacion);
    Task<IEnumerable<UsuarioJuego>> ObtenerRankingPorJuegoAsync(string nombreJuego);
}
