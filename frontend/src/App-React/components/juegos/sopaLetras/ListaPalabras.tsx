import React from "react";

interface ListaPalabrasProps {
    palabras: string[];
    palabrasEncontradas: string[];
}

const ListaPalabras: React.FC<ListaPalabrasProps> = ({
    palabras,
    palabrasEncontradas,
}) => {
    return (
        <div className="lista-palabras">
            <ul>
                {palabras.map((palabra, i) => {
                    const encontrada = palabrasEncontradas.includes(palabra);
                    return (
                        <li
                            key={i}
                            style={{
                                textDecoration: encontrada ? "line-through" : "none",
                                color: encontrada ? "green" : "black",
                                fontWeight: encontrada ? "bold" : "normal",
                            }}
                        >
                            {palabra}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListaPalabras;
