import { render, screen, waitFor } from "@testing-library/react";
import Ranking from "./Ranking";
import { describe, it, expect, vi } from "vitest";
import * as ObtenerPuntuacionHook from "../../hooks/ObtenerPuntuacion";

describe("Ranking", () => {
  const mockRanking = [
    { idUsuario: 1, nombreUsuario: "Usuario1", puntos: 150 },
    { idUsuario: 2, nombreUsuario: "Usuario2", puntos: 120 },
    { idUsuario: 3, nombreUsuario: "Usuario3", puntos: 100 },
  ];

  it("renderiza el título correctamente", async () => {
    vi.spyOn(ObtenerPuntuacionHook, "obtenerPuntuacion").mockResolvedValue(mockRanking);

    render(<Ranking tituloRanking="Top Jugadores" nombreJuego="Tetris" />);
    expect(screen.getByText("Top Jugadores")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText("Usuario1")).toBeInTheDocument();
    });
  });

  it("llama a obtenerPuntuacion con el nombre del juego", async () => {
    const spy = vi.spyOn(ObtenerPuntuacionHook, "obtenerPuntuacion").mockResolvedValue(mockRanking);

    render(<Ranking tituloRanking="Ranking" nombreJuego="Tetris" />);
    
    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("Tetris");
    });
  });

  it("muestra los primeros 5 usuarios máximo", async () => {
    const mock5Users = Array.from({ length: 7 }, (_, i) => ({
      idUsuario: i + 1,
      nombreUsuario: `Jugador${i + 1}`,
      puntos: 100 - i * 10,
    }));

    vi.spyOn(ObtenerPuntuacionHook, "obtenerPuntuacion").mockResolvedValue(mock5Users);

    render(<Ranking tituloRanking="Top 5" />);
    
    await waitFor(() => {
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(`Jugador${i}`)).toBeInTheDocument();
      }
      expect(screen.queryByText("Jugador6")).not.toBeInTheDocument();
    });
  });

  it("maneja errores sin crashear", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(ObtenerPuntuacionHook, "obtenerPuntuacion").mockRejectedValue(new Error("Fallo en fetch"));

    render(<Ranking tituloRanking="Error Test" />);
    
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });
});
