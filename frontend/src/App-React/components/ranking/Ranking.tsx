import { useEffect, useState } from "react";
import { obtenerPuntuacion } from "../../hooks/ObtenerPuntuacion"
export interface RankingItem {
  idUsuario: number;
  nombreUsuario: string;
  puntos: number;
}
 
type Props = {
  tituloRanking: string;

  // Dependiendo de si está declarado o no se usa un endpoint u otro
  nombreJuego?: string;
}


export default function Ranking({ tituloRanking, nombreJuego }: Props) {

  const [ranking, setRanking] = useState<RankingItem[]>([]);

  useEffect(() => {
    async function cargarPuntuacion() {
      try {
        if (nombreJuego) {
          const data: RankingItem[] = await obtenerPuntuacion(nombreJuego);
          setRanking(data);
        } else {
          const data = await obtenerPuntuacion();
          setRanking(data);
        }

      } catch (error) {
        console.error("Error al obtener la puntuación:", error);
      }
    }

    cargarPuntuacion();
  }, [nombreJuego]);
  console.log(ranking);
  if (ranking != undefined) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md max-w-sm w-full mt-0">
        <h2 className="text-xl font-bold text-center text-indigo-700 mb-3">
          {tituloRanking}
        </h2>
        <ul className="space-y-2">
          {ranking.slice(0,5).map((item) => (
            <li
              key={item.idUsuario}
              className="flex justify-between items-center p-2 bg-indigo-100 rounded-md text-gray-800 text-sm"
            >
              <span className="flex-1 text-center truncate">{item.nombreUsuario} </span>
              <span className="font-semibold">{item.puntos} pts</span>
            </li>
          ))}
          
        </ul>

      </div>
    );
  } else {
    ""
  } 

}


