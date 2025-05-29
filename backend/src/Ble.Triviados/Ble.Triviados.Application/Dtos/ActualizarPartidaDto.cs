namespace Ble.Triviados.Application.Dtos
{
    public class ActualizarPartidaDto
    {
        public int PartidaId { get; set; }
        public bool RespuestaCorrecta { get; set; }
        public string TipoPregunta { get; set; } = string.Empty;
    }
}
