using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Application.Interfaces;

public interface IJuegoService
{
    Task<Juego> CrearJuegoAsync(string nombre, string descripcion);
    Task<Juego?> ObtenerJuegoPorIdAsync(int id);
    Task<Juego?> ObtenerPorNombreAsync(string nombre);
    Task<IEnumerable<Juego>> ObtenerTodosLosJuegosAsync();
}
