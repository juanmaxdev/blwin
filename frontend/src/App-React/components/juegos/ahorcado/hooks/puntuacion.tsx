

export async function enviarPuntuacion(puntuacion: number, token: string) {
  
  const response = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ puntuacion, token }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Error al enviar la puntuación');
  }
}