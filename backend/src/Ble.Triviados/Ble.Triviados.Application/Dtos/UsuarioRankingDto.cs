using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ble.Triviados.Application.Dtos
{
    public class UsuarioRankingDto
    {
        public int UsuarioId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public int Puntos { get; set; }
    }
}
