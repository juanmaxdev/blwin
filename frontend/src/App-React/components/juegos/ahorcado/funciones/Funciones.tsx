export default function contadorPuntos(puntos: number, setPuntos: (puntos: number) => void) {

  setPuntos(puntos + 1);
  

  return(
    puntos + 1
  ); 
}