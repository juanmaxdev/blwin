namespace Ble.Triviados.Application.Dtos;

public class RankingItemDto
{
    public int Posicion { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public int Puntos { get; set; }
    public bool EsUsuarioActual { get; set; }
    public int UsuarioId { get; set; }

}
