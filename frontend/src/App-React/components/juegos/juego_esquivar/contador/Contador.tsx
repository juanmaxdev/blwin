import { Box } from "@mui/material";

type Props = {
    puntos: number;
    columna: number;
    fila: number;
}
export default function Contador({ puntos, fila, columna, }: Props) {
    return (
        <div
            style={{
                gridColumn: `${columna} / ${columna + 1}`,
                gridRow: `${fila} / ${fila + 1}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{
                background: 'radial-gradient(rgba(0, 234, 255, 0.3), #8f00ff)',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: "40%",
                width: "40%",
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: "white"
            }}
            >
                {puntos}
            </Box>
        </div>
    );
}


