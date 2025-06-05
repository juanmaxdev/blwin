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
    public class JuegoService : IJuegoService
    {
        private readonly IJuegoRepository _juegoRepository;

        public JuegoService(IJuegoRepository juegoRepository)
        {
            _juegoRepository = juegoRepository;
        }

        public async Task<Juego> CrearJuegoAsync(string nombre, string descripcion)
        {
            var juego = new Juego
            {
                Nombre = nombre,
                Descripcion = descripcion
            };
            return await _juegoRepository.CrearAsync(juego);
        }

        public async Task<Juego?> ObtenerJuegoPorIdAsync(int id)
        {
            return await _juegoRepository.ObtenerPorIdAsync(id);
        }

        public async Task<Juego?> ObtenerPorNombreAsync(string nombre)
        {
            return await _juegoRepository.ObtenerPorNombreAsync(nombre);
        }

        public async Task<IEnumerable<Juego>> ObtenerTodosLosJuegosAsync()
        {
            return await _juegoRepository.ObtenerTodosAsync();
        }
    }
}
