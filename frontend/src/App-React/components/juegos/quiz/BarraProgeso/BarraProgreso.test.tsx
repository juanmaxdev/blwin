import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BarraProgeso from './BarraProgreso'

// Mock del componente Progreso
vi.mock('../../../components/juegos/quiz/ui/Progreso', () => ({
    Progreso: ({ value, className }: { value: number; className?: string }) => (
        <div data-testid="progreso" data-value={value} className={className}>
            Progreso: {value}%
        </div>
    ),
}))

describe('BarraProgeso', () => {
    const props = {
        preguntaActual: 2,
        preguntasTotales: 5,
        progreso: 60,
        puntuacion: 120,
    }

    it('muestra el número correcto de pregunta y total', () => {
        render(<BarraProgeso {...props} />)
        expect(screen.getByText(/Pregunta 3 de 5/i)).toBeInTheDocument()
    })

    it('muestra correctamente el progreso', () => {
        render(<BarraProgeso {...props} />)
        const progreso = screen.getByTestId('progreso')
        expect(progreso).toHaveTextContent('Progreso: 60%')
        expect(progreso).toHaveAttribute('data-value', '60')
        expect(progreso).toHaveClass('w-48')
    })

    it('muestra correctamente la puntuación', () => {
        render(<BarraProgeso {...props} />)
        expect(screen.getByText('120')).toBeInTheDocument()
        expect(screen.getByText(/puntos/i)).toBeInTheDocument()
    })
})
