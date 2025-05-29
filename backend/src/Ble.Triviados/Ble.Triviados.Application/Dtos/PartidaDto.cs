namespace Ble.Triviados.Application.Dtos
{
    public class PartidaDto
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public int PuntosPartida { get; set; }
        public int VidasRestantes { get; set; }
    }
}
