import React from "react";
import type { EntradaPalabra } from "./Palabras";

interface ListaPalabrasProps {
  entradas: EntradaPalabra[];
  palabrasEncontradas: string[];
}

const ListaPalabras: React.FC<ListaPalabrasProps> = ({
  entradas,
  palabrasEncontradas,
}) => {
  return (
    <div className="lista-palabras">
      <ul>
        {entradas.map((entrada, i) => {
          const encontrada = palabrasEncontradas.includes(entrada.palabra);
          return (
            <li
              key={i}
              style={{
                textDecoration: encontrada ? "line-through" : "none",
                color: encontrada ? "green" : "black",
                fontWeight: encontrada ? "bold" : "normal",
              }}
            >
              {entrada.pista}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListaPalabras;
