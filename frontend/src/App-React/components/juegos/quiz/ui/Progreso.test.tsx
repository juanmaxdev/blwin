import { describe, it, expect } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { Progreso } from "./Progreso"

describe("Progreso", () => {
  it("renderiza correctamente con valor dado", () => {
    render(<Progreso value={50} data-testid="progreso" />)
    const progreso = screen.getByTestId("progreso")
    expect(progreso).toBeInTheDocument()
    // Verificamos que el estilo del indicador contenga la transformación correcta
    const indicador = progreso.querySelector("div")
    expect(indicador).toBeTruthy()
    expect(indicador?.style.transform).toBe("translateX(-50%)")
  })

  it("usa 0 como valor predeterminado cuando no se pasa value", () => {
    render(<Progreso data-testid="progreso" />)
    const progreso = screen.getByTestId("progreso")
    const indicador = progreso.querySelector("div")
    expect(indicador?.style.transform).toBe("translateX(-100%)")
  })

  it("aplica clases adicionales pasadas por className", () => {
    render(<Progreso value={30} className="mi-clase" data-testid="progreso" />)
    const progreso = screen.getByTestId("progreso")
    expect(progreso).toHaveClass("mi-clase")
  })
})
