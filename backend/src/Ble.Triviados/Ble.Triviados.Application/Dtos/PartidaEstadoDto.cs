namespace Ble.Triviados.Application.Dtos
{
    public class PartidaEstadoDto
    {
        public int PartidaId { get; set; }
        public int UsuarioId { get; set; }
        public int VidasRestantes { get; set; }
        public int Puntos { get; set; }
        public bool PartidaFinalizada => VidasRestantes <= 0;
    }
}
