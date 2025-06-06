using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Domain.Entity.Interfaces
{
    public interface IUsuarioJuegoRepository
    {
        Task<UsuarioJuego> RegistrarPuntuacionAsync(UsuarioJuego usuarioJuego);
        Task<UsuarioJuego?> ObtenerPorUsuarioYJuegoAsync(int usuarioId, int juegoId);
        Task<IEnumerable<UsuarioJuego>> ObtenerPorUsuarioAsync(int usuarioId);

        Task<UsuarioJuego?> ActualizarRelacionAsync(UsuarioJuego relacion);
    }
}
