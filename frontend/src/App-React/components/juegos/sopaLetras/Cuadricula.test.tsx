import { render, screen, fireEvent } from "@testing-library/react";
import Cuadricula from "./Cuadricula";
import { vi } from "vitest";

describe("Cuadricula", () => {
  const matriz = [["A", "B"], ["C", "D"]];
  const seleccion = [{ fila: 0, col: 0 }];
  const palabrasEncontradas = [{ texto: "AB", coords: [{ fila: 0, col: 0 }, { fila: 0, col: 1 }] }];

  const iniciarSeleccion = vi.fn();
  const agregarACoordenadas = vi.fn();
  const terminarSeleccion = vi.fn();

  it("renderiza todas las letras de la matriz", () => {
    render(
      <Cuadricula
        matriz={matriz}
        seleccion={[]}
        palabrasEncontradas={[]}
        iniciarSeleccion={iniciarSeleccion}
        agregarACoordenadas={agregarACoordenadas}
        terminarSeleccion={terminarSeleccion}
      />
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("aplica clase 'seleccionada' correctamente", () => {
    render(
      <Cuadricula
        matriz={matriz}
        seleccion={seleccion}
        palabrasEncontradas={[]}
        iniciarSeleccion={iniciarSeleccion}
        agregarACoordenadas={agregarACoordenadas}
        terminarSeleccion={terminarSeleccion}
      />
    );
    const celda = screen.getByText("A");
    expect(celda.classList.contains("seleccionada")).toBe(true);
  });

  it("aplica clase 'encontrada' correctamente", () => {
    render(
      <Cuadricula
        matriz={matriz}
        seleccion={[]}
        palabrasEncontradas={palabrasEncontradas}
        iniciarSeleccion={iniciarSeleccion}
        agregarACoordenadas={agregarACoordenadas}
        terminarSeleccion={terminarSeleccion}
      />
    );
    expect(screen.getByText("A").classList.contains("encontrada")).toBe(true);
  });

  it("llama eventos correctamente", () => {
    render(
      <Cuadricula
        matriz={matriz}
        seleccion={[]}
        palabrasEncontradas={[]}
        iniciarSeleccion={iniciarSeleccion}
        agregarACoordenadas={agregarACoordenadas}
        terminarSeleccion={terminarSeleccion}
      />
    );
    fireEvent.mouseDown(screen.getByText("A"));
    expect(iniciarSeleccion).toHaveBeenCalled();

    fireEvent.mouseEnter(screen.getByText("A"));
    expect(agregarACoordenadas).toHaveBeenCalled();

    fireEvent.mouseUp(screen.getByText("A"));
    expect(terminarSeleccion).toHaveBeenCalled();
  });
});
