import Button from '@mui/material/Button';
type Props = {
    valor : string;
    funcion? : () => void;
    fila: number;
    columna: number;
}
export default function Boton({ valor, funcion, fila, columna }: Props) {
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
      <Button
        value={valor}
        onClick={funcion}
        color="success"
        variant="contained"
        sx={{
          height: "40%",
          width: "80%",
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}
      >
        {valor}
      </Button>
    </div>
  );
}
