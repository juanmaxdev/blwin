export async function obtenerPuntuacionUsuario() {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/Usuario/mis-puntos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Error al obtener la puntuación:", error);
        throw error;
    }
}
