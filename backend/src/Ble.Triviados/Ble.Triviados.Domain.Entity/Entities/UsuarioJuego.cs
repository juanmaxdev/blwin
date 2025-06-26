using System.Text.Json.Serialization;

namespace Ble.Triviados.Domain.Entity.Entities;

public class UsuarioJuego
{
    public int UsuarioId { get; set; }
    
    [JsonIgnore]
    public Usuario Usuario { get; set; }

    public int JuegoId { get; set; }

    [JsonIgnore]
    public Juego Juego { get; set; }

    public int Puntuacion { get; set; }
}
