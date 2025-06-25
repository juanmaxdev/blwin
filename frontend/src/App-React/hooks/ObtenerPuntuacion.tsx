import { RankingItem } from "../components/ranking/Ranking";
export async function obtenerPuntuacion(nombreJuego?: string) : Promise<RankingItem[]> {

     const url = nombreJuego
    ? `/api/usuariojuego/ranking/${nombreJuego}`
    : "/api/usuario/ranking";
  const response = await fetch(url);
  const data = await response.json();

  return data.map((item: any) => ({
    idUsuario: item.usuarioId,
    nombreUsuario: item.nombre,
    puntos: item.puntos
  }));
}