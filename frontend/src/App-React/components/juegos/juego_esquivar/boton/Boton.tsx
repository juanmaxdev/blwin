import Button from '@mui/material/Button';
type Props = {
    valor : string;
    funcion? : () => void;
}
export default function Boton({valor, funcion} : Props) {
  return (
    <Button value={valor} onClick={funcion} color="success" variant="outlined">{valor}</Button>
  )
}
