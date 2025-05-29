
export interface RankingItem {
  posicion: number;
  nombreUsuario: string;
  puntos: number;
}

const RankingPreview = ({ ranking }: { ranking: RankingItem[] }) => {
  if (ranking.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md max-w-sm w-full mt-0">
      <h2 className="text-xl font-bold text-center text-indigo-700 mb-3">
        🏆 Top 5 del Ranking
      </h2>
      <ul className="space-y-2">
        {ranking.map((item) => (
          <li
            key={item.posicion}
            className="flex justify-between items-center p-2 bg-indigo-100 rounded-md text-gray-800 text-sm"
          >
            <span className="font-semibold">{item.posicion}</span>
            <span className="flex-1 text-center truncate">{item.nombreUsuario}</span>
            <span className="font-semibold">{item.puntos} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingPreview;
