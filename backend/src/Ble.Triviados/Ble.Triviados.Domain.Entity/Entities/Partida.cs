using System;

namespace Ble.Triviados.Domain.Entity.Entities
{
    public class Partida : BaseEntity
    {
        public int UsuarioId { get; set; }

        public DateTime FechaInicio { get; set; } = DateTime.Now;

        public DateTime? FechaFin { get; set; }

        public int PuntosPartida { get; set; } = 0;

        public int VidasRestantes { get; set; } = 3;

        public Usuario Usuario { get; set; } = null!;

        public Partida(int usuarioId, DateTime fechaInicio, DateTime? fechaFin, int puntosPartida, int vidasRestantes)
        {
            if (puntosPartida < 0)
                throw new ArgumentException("Los puntos no pueden ser negativos.");

            if (vidasRestantes < 0)
                throw new ArgumentException("Las vidas no pueden ser negativas.");

            UsuarioId = usuarioId;
            FechaInicio = fechaInicio;
            FechaFin = fechaFin;
            PuntosPartida = puntosPartida;
            VidasRestantes = vidasRestantes;
        }

        public Partida() { }
    }
}
