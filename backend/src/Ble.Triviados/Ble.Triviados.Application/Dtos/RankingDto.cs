namespace Ble.Triviados.Application.Dtos;

public class RankingDto
{
    public List<JugadorRankingDto> Top10 { get; set; } = new();
    public JugadorRankingDto? UsuarioActual { get; set; }
}

public class JugadorRankingDto
{
    public int Posicion { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public int Puntos { get; set; }
}
