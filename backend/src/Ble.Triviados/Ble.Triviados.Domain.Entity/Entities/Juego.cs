using System.Text.Json.Serialization;

namespace Ble.Triviados.Domain.Entity.Entities;

public class Juego
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }

    [JsonIgnore]
    public ICollection<UsuarioJuego> UsuariosJuego { get; set; } = new List<UsuarioJuego>();
}
