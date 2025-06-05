import Button from '@mui/material/Button';
type Props = {
  valor: string;
  funcion?: () => void;
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
        variant="contained"
        sx={{
          height: "40%",
          width: "80%",
          background: 'radial-gradient(rgba(0, 234, 255, 0.3), #8f00ff)',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        {valor}
      </Button>
    </div>
  );
}
