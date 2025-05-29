using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ble.Triviados.Domain.Entity.Entities;

namespace Ble.Triviados.Domain.Entity.Services
{
    public class PartidaService 
    {
        public void ActualizarPartida(Partida partida, Usuario usuario)
        {
            // Lógica de negocio para modificar la partida
            if (usuario == null)
                throw new ArgumentNullException(nameof(usuario));

            partida.PuntosPartida += 100 ;
        }

        public static void FinalizarPartida(Partida partida, Usuario usuario)
        {
            partida.FechaFin = DateTime.Now;
        }
    }
}
