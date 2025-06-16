import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { RetosModal } from "./ModalReto"
import type { Retos } from "../types/Juego"

const mockRetos: Retos = {
  id: "1",
  tipo: "teoría",
  lenguaje: "JavaScript",
  titulo: "¿Qué es JS?",
  descripcion: "Esta es una pregunta básica sobre JavaScript.",
  preguntas: "¿JavaScript es un lenguaje de...?",
  opciones: ["marcado", "estilo", "programación"],
  respuestaCorrecta: "programación",
  explicacion: "JavaScript es un lenguaje de programación.",
  accion: "pedirCarta",
  dificultad: "fácil",
}

describe("RetosModal con tipo teoría", () => {
  it("muestra el reto completo y permite verificar respuesta", () => {
    const onComplete = vi.fn()
    const onClose = vi.fn()

    render(<RetosModal retos={mockRetos} onComplete={onComplete} onClose={onClose} />)

    // Título
    expect(screen.getByText(mockRetos.titulo)).toBeInTheDocument()

    // Pregunta y opciones
    expect(screen.getByText(mockRetos.preguntas)).toBeInTheDocument()
    for (const opcion of mockRetos.opciones!) {
      expect(screen.getByLabelText(opcion)).toBeInTheDocument()
    }

    // Simular selección correcta
    fireEvent.click(screen.getByLabelText("programación"))
    fireEvent.click(screen.getByRole("button", { name: /verificar/i }))

    expect(screen.getByText("¡Correcto!")).toBeInTheDocument()
    expect(screen.getByText(mockRetos.explicacion)).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /continuar/i }))
    expect(onComplete).toHaveBeenCalledWith(true)
    expect(onClose).toHaveBeenCalled()
  })
})
