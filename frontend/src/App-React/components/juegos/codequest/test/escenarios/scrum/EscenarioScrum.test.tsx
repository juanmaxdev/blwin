import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import EscenarioScrum from '../../../escenarios/scrum/EscenarioScrum'
import { vi } from 'vitest'

describe('EscenarioScrum', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  it('muestra estado inicial sin fallos', () => {
    render(<EscenarioScrum fallosConsecutivos={0} preguntaActual={1} />)

    expect(screen.getByAltText(/daily meeting/i)).toBeInTheDocument()
    expect(screen.getByText(/buen ambiente de trabajo/i)).toBeInTheDocument()
    expect(screen.getByText(/¡excelente trabajo!/i)).toBeInTheDocument()
  })

  it('muestra estado con 1 fallo', () => {
    render(<EscenarioScrum fallosConsecutivos={1} preguntaActual={1} />)

    expect(screen.getByText(/scrum master parece estar preocupado/i)).toBeInTheDocument()
    expect(screen.getByText(/el equipo necesita apoyo/i)).toBeInTheDocument()
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0)
    expect(screen.getAllByTestId('fallo-indicador').length).toBe(1)
  })

  it('muestra estado con 2 fallos', () => {
    render(<EscenarioScrum fallosConsecutivos={2} preguntaActual={2} />)

    expect(screen.getByText(/la reunión se está volviendo caótica/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('fallo-indicador').length).toBe(2)
  })

  it('muestra estado con 3 fallos o más', () => {
    render(<EscenarioScrum fallosConsecutivos={4} preguntaActual={3} />)

    expect(screen.getByText(/completo desastre/i)).toBeInTheDocument()
    expect(screen.getByText(/crisis en el sprint/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('fallo-indicador').length).toBe(3)
  })
})
