using Ble.Triviados.Application.Dtos;

namespace Ble.Triviados.Application.Interfaces
{
    public interface IUsuarioService
    {
        Task<string> RegistrarUsuarioAsync(RegistroUsuarioDto dto);
        Task<string> LoginUsuarioAsync(LoginUsuarioDto dto);
        Task<PuntuacionDto?> AgregarPuntosUsuarioAsync(PuntuacionDto dto);

    }
}
