using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ble.Triviados.Domain.Entity.Entities
{
    public class UsuarioJuego
    {
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public int JuegoId { get; set; }
        public Juego Juego { get; set; }

        public int Puntuacion { get; set; }
    }
}
