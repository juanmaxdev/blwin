import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResultadoJuego from './ResultadoJuego'
import { MemoryRouter } from 'react-router-dom'

vi.mock('./ui/Progreso', () => ({
    Progreso: ({ value }: { value: number }) => (
        <div data-testid="progreso">{`Progreso: ${value.toFixed(1)}%`}</div>
    ),
}))
vi.mock('./ui/Boton', () => ({
    Boton: ({ children, onClick }: any) => (
        <button onClick={onClick}>{children}</button>
    ),
}))
vi.mock('./ui/Carta', () => ({
    Carta: ({ children }: any) => <div>{children}</div>,
    CartaHeader: ({ children }: any) => <header>{children}</header>,
    CartaTitle: ({ children }: any) => <h1>{children}</h1>,
    CartaDescription: ({ children }: any) => <p>{children}</p>,
    CartaContent: ({ children }: any) => <main>{children}</main>,
}))

describe('ResultadoJuego', () => {
    const renderComponent = (score: number, maxScore: number, onRestart = vi.fn()) =>
        render(
            <MemoryRouter>
                <ResultadoJuego score={score} maxScore={maxScore} onRestart={onRestart} />
            </MemoryRouter>
        )

    it('muestra el score y el mensaje de desempeño correspondiente', () => {
        renderComponent(8, 10)

        expect(screen.getByText('8')).toBeInTheDocument()
        expect(screen.getByText(/de 10 puntos posibles/i)).toBeInTheDocument()
        expect(screen.getByText('¡Excelente!')).toBeInTheDocument()
        expect(screen.getByTestId('progreso')).toHaveTextContent('Progreso: 80.0%')
    })

    it('muestra "Puedes mejorar" si el porcentaje está entre 40 y 59', () => {
        renderComponent(4, 10)
        expect(screen.getByText('Puedes mejorar')).toBeInTheDocument()
    })

    it('muestra "Sigue practicando" si el porcentaje es menor a 40', () => {
        renderComponent(3, 10)
        expect(screen.getByText('Sigue practicando')).toBeInTheDocument()
    })

    it('llama a onRestart cuando se hace click en "Jugar de Nuevo"', () => {
        const onRestart = vi.fn()
        renderComponent(5, 10, onRestart)

        const jugarBtn = screen.getByText(/jugar de nuevo/i)
        fireEvent.click(jugarBtn)

        expect(onRestart).toHaveBeenCalledOnce()
    })

    it('tiene el botón de volver al inicio con texto correcto', () => {
        renderComponent(6, 10)
        expect(screen.getByText(/volver al inicio/i)).toBeInTheDocument()
    })
})
