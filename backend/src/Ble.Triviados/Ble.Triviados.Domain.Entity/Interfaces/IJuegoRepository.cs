using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Domain.Entity.Interfaces
{
    public interface IJuegoRepository
    {
        Task<Juego> CrearAsync(Juego juego);
        Task<Juego?> ObtenerPorIdAsync(int id);
        Task<Juego?> ObtenerPorNombreAsync(string nombre);
        Task<IEnumerable<Juego>> ObtenerTodosAsync();
    }
}
