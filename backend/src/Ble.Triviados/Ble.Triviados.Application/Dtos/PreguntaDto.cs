namespace Ble.Triviados.Application.Dtos
{
    public class PreguntaDto
    {
        public int Id { get; set; }
        public string Enunciado { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty;
        public string Tematica { get; set; } = string.Empty;
        public string RespuestaCorrecta { get; set; } = string.Empty;
        public List<string> RespuestasPregunta { get; set; } = new();
    }
}
