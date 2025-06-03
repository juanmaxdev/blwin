using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ble.Triviados.Application.Interfaces;
using Ble.Triviados.Domain.Entity.Entities;
using Ble.Triviados.Domain.Entity.Interfaces;

namespace Ble.Triviados.Application.Services
{
    public class UsuarioJuegoService : IUsuarioJuegoService
    {
        private readonly IUsuarioJuegoRepository _usuarioJuegoRepository;

        public UsuarioJuegoService(IUsuarioJuegoRepository usuarioJuegoRepository)
        {
            _usuarioJuegoRepository = usuarioJuegoRepository;
        }

        public async Task<UsuarioJuego> RegistrarPuntuacionAsync(int usuarioId, int juegoId, int puntuacion)
        {
            var usuarioJuego = new UsuarioJuego
            {
                UsuarioId = usuarioId,
                JuegoId = juegoId,
                Puntuacion = puntuacion
            };

            return await _usuarioJuegoRepository.RegistrarPuntuacionAsync(usuarioJuego);
        }

        public async Task<UsuarioJuego?> ObtenerRelacionAsync(int usuarioId, int juegoId)
        {
            return await _usuarioJuegoRepository.ObtenerPorUsuarioYJuegoAsync(usuarioId, juegoId);
        }

        public async Task<IEnumerable<UsuarioJuego>> ObtenerJuegosPorUsuarioAsync(int usuarioId)
        {
            return await _usuarioJuegoRepository.ObtenerPorUsuarioAsync(usuarioId);
        }
    }
}
