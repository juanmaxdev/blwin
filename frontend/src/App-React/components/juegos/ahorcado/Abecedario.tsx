import { useState } from "react";
import BotonLetra from "./BotonLetra";

const Abecedario = () => {
    const [deshabilitarBoton, setDeshabilitarBoton] = useState<Set<string>>(new Set());

    const handleClick = (letra: string) => {
        setDeshabilitarBoton((prev) => new Set(prev).add(letra));
    }

    const letrasAbecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const arrayLetras = letrasAbecedario.split('');

    const letrasAgrupadas = (array: string[], numeroLetras: number): string[][] => {
        const resultado: string[][] = [];
        for (let i = 0; i < array.length; i += numeroLetras) {
            resultado.push(array.slice(i, i + numeroLetras));
        }
        return resultado;
    };


    const filas = letrasAgrupadas(arrayLetras, 9);

    return (
        <div className="space-y-2">
            {filas.map((fila, index) => (
                <div key={index} className="flex gap-2">
                    {fila.map((letra) => (
                        <BotonLetra key={letra} letra={letra} onClick={() => { handleClick(letra) }} disabled={deshabilitarBoton.has(letra)} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Abecedario;
