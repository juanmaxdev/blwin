import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import JuegoQuiz from "./JuegoQuiz"
import { describe, it, expect, vi, beforeEach } from "vitest"
import * as preguntasData from "../../../components/juegos/quiz/data/Preguntas"
import { Pregunta } from "../../../components/juegos/quiz/data/Preguntas"
import '@testing-library/jest-dom'

vi.mock("../../../components/juegos/quiz/HeaderJuego", () => ({
  default: () => <div data-testid="header">HeaderJuego</div>,
}))
vi.mock("../../../components/juegos/quiz/BarraProgreso", () => ({
  default: () => <div data-testid="barra">BarraProgreso</div>,
}))
vi.mock("../../../components/juegos/quiz/CartaPregunta", () => ({
  default: (props: any) => (
    <div data-testid="pregunta">
      <button onClick={() => props.onPreguntaSeleccionada("respuesta1")}>
        Seleccionar respuesta
      </button>
      {props.mostrarResultados && (
        <button onClick={props.onSiguientePregunta}>Siguiente</button>
      )}
    </div>
  ),
}))
vi.mock("../../../components/juegos/quiz/ResultadoJuego", () => ({
  default: ({ score, onRestart }: any) => (
    <div data-testid="resultado">
      Resultado: {score}
      <button onClick={onRestart}>Reiniciar</button>
    </div>
  ),
}))

describe("JuegoQuiz", () => {
  beforeEach(() => {
  const mockPreguntas: Pregunta[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    pregunta: `Pregunta ${i + 1}`,
    opciones: ["respuesta1", "respuesta2", "respuesta3"],
    respuestaCorrecta: "respuesta1",
    codigo: "",
  }))
  
  vi.spyOn(preguntasData, "Preguntas", "get").mockReturnValue(mockPreguntas)
})

  it("permite seleccionar una respuesta y avanzar", async () => {
    render(<JuegoQuiz />)

    // Espera a que cargue la primera pregunta
    const pregunta = await screen.findByTestId("pregunta")
    expect(pregunta).toBeInTheDocument()

    // Selecciona respuesta
    fireEvent.click(screen.getByText(/seleccionar respuesta/i))

    // Botón siguiente visible después de seleccionar
    fireEvent.click(screen.getByText(/siguiente/i))
  })

  it("muestra resultado final al terminar", async () => {
    render(<JuegoQuiz />)

    for (let i = 0; i < 8; i++) {
      await waitFor(() => screen.getByTestId("pregunta"))
      fireEvent.click(screen.getByText(/seleccionar respuesta/i))
      fireEvent.click(screen.getByText(/siguiente/i))
    }

    await waitFor(() => {
      expect(screen.getByTestId("resultado")).toBeInTheDocument()
    })

    expect(screen.getByText(/resultado/i)).toHaveTextContent("Resultado: 80")
  })

  it("permite reiniciar el juego", async () => {
    render(<JuegoQuiz />)

    for (let i = 0; i < 8; i++) {
      await waitFor(() => screen.getByTestId("pregunta"))
      fireEvent.click(screen.getByText(/seleccionar respuesta/i))
      fireEvent.click(screen.getByText(/siguiente/i))
    }

    await screen.findByTestId("resultado")
    fireEvent.click(screen.getByText(/reiniciar/i))

    await screen.findByTestId("pregunta")
    expect(screen.queryByTestId("resultado")).not.toBeInTheDocument()
  })
})
