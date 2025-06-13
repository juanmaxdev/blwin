export async function restarPuntuacion(puntos: number) {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/Usuario/restar-puntos", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(puntos),
        });

        return response;
    } catch (error) {
        console.error("Error al restar puntos:", error);
        throw error;
    }
}
