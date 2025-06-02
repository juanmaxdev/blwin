using Ble.Triviados.Application.Dtos;

namespace Ble.Triviados.Application.Interfaces
{
    public interface IUsuarioService
    {
        Task<string> RegistrarUsuarioAsync(RegistroUsuarioDto dto);
        Task<string> LoginUsuarioAsync(LoginUsuarioDto dto);
        Task<PtosDto?> AgregarPuntosUsuarioAsync(int usuarioId, int puntos);
    }
}
