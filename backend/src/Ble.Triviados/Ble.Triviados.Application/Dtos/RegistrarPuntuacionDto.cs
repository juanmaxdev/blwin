using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ble.Triviados.Application.Dtos
{
    public class RegistrarPuntuacionDto
    {
        public int JuegoId { get; set; }
        public int Puntuacion { get; set; }
    }
}
