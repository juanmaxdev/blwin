import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { ResumenPartida } from './ResumenPartida'

// Mock del botón personalizado
vi.mock('../../quiz/ui/Boton', () => ({
    Boton: ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
        <button onClick={onClick}>{children}</button>
    )
}))

const defaultProps = {
    puntosTotales: 120,
    preguntasRespondidas: 10,
    repuestasCorrectas: 8,
    partidasJugadas: 3,
    onRestart: vi.fn()
}

describe('ResumenPartida', () => {
    it('muestra el título y cantidad de partidas', () => {
        render(<ResumenPartida {...defaultProps} />)
        expect(screen.getByText(/¡Sesión Completada!/i)).toBeInTheDocument()
        expect(screen.getByText(/Completaste 3 partidas/i)).toBeInTheDocument()
    })

    it('muestra correctamente los puntos totales', () => {
        render(<ResumenPartida {...defaultProps} />)
        expect(screen.getByText('120')).toBeInTheDocument()
        expect(screen.getByText(/Puntos Totales/i)).toBeInTheDocument()
    })

    it('muestra la precisión calculada', () => {
        render(<ResumenPartida {...defaultProps} />)
        expect(screen.getByText('80%')).toBeInTheDocument() // 8 / 10 = 80%
        expect(screen.getByText(/Precisión/i)).toBeInTheDocument()
    })

    it('muestra el total de preguntas y correctas', () => {
        render(<ResumenPartida {...defaultProps} />)
        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText(/Preguntas/i)).toBeInTheDocument()
        expect(screen.getByText('8')).toBeInTheDocument()
        expect(screen.getByText(/Correctas/i)).toBeInTheDocument()
    })

    it('ejecuta la función de reinicio al hacer click en el botón', () => {
        render(<ResumenPartida {...defaultProps} />)
        const boton = screen.getByRole('button', { name: /nueva sesión/i })
        fireEvent.click(boton)
        expect(defaultProps.onRestart).toHaveBeenCalled()
    })

    it('muestra precisión 0% si no hay preguntas respondidas', () => {
        render(<ResumenPartida {...defaultProps} preguntasRespondidas={0} repuestasCorrectas={0} />)
        expect(screen.getByText('0%')).toBeInTheDocument()
    })
})