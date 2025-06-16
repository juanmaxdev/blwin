import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Mano } from './Mano'
import type { Carta as CartaTipo } from '../types/Juego'

// Mock para el componente Carta para aislar las pruebas de Mano
vi.mock('./Carta', () => ({
    Carta: ({ carta, cartaOculta }: any) => (
        <div data-testid="carta" data-oculta={cartaOculta ? 'true' : 'false'}>
            {carta.valor}
        </div>
    ),
}))

describe('Mano', () => {
    const cartasMock: CartaTipo[] = [
        { valor: 'A', color: 'corazones', valorNumerico: 1 },
        { valor: '10', color: 'picas', valorNumerico: 10 },
        { valor: 'K', color: 'diamantes', valorNumerico: 10 },
    ]

    it('renderiza el título y la puntuación', () => {
        render(<Mano cartas={cartasMock} titulo="Mano Test" puntuacion={21} />)

        expect(screen.getByText('Mano Test')).toBeInTheDocument()
        expect(screen.getByText('Puntuación: 21')).toBeInTheDocument()
    })

    it('oculta la primera carta cuando ocultarPrimeraCarta es true', () => {
        render(<Mano cartas={cartasMock} titulo="Mano Oculta" puntuacion={15} ocultarPrimeraCarta />)

        const cartas = screen.getAllByTestId('carta')

        expect(cartas[0]).toHaveAttribute('data-oculta', 'true')
        // Las demás cartas no deben estar ocultas
        expect(cartas[1]).toHaveAttribute('data-oculta', 'false')
        expect(cartas[2]).toHaveAttribute('data-oculta', 'false')

        // Puntuación debe mostrar "?"
        expect(screen.getByText('Puntuación: ?')).toBeInTheDocument()
    })

    it('muestra todas las cartas visibles cuando ocultarPrimeraCarta es false', () => {
        render(<Mano cartas={cartasMock} titulo="Mano Visible" puntuacion={30} />)

        const cartas = screen.getAllByTestId('carta')

        cartas.forEach((carta) => {
            expect(carta).toHaveAttribute('data-oculta', 'false')
        })

        expect(screen.getByText('Puntuación: 30')).toBeInTheDocument()
    })
})
