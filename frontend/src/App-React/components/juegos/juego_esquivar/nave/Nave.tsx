import { Box } from "@mui/material";
import PJ from "../../../../assets/juegos/juego_esquivar/PJ.png"

export default function Nave({ fila, columna }: { fila: number; columna: number }) {
    return (
        <>
            <Box sx={{
                gridColumn: `${columna} / ${columna + 1}`, 
                gridRow: `${fila} / ${fila + 1}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "auto",}}>
                <img src={PJ} alt="Imagen de una nave" />
            </Box>
        </>
    )
}