using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Ble.Triviados.Domain.Entity.Entities
{
    public class Juego
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }

        [JsonIgnore]
        public ICollection<UsuarioJuego> UsuariosJuego { get; set; } = new List<UsuarioJuego>();
    }
}
