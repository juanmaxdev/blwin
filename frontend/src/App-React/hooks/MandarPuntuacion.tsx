export async function mandarPuntuacion(nombreJuego: string, puntuacion: number) {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/usuario/agregar-puntos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify({
                NombreJuego: nombreJuego,
                Puntuacion: puntuacion,
            }),
        });

        return response;
    } catch (error) {
        console.error("Error al actualizar la puntuación:", error);
        throw error;
    }
}
