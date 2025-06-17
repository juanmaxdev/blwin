import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import { Tablero } from './TableroJuego'
import type { Carta } from '../types/Juego'

vi.mock('./Mano', () => ({
    Mano: ({ titulo, puntuacion }: { titulo: string; puntuacion: number }) => (
        <div>
            <h3>{titulo}</h3>
            <p>Puntuación: {puntuacion}</p>
        </div>
    )
}))

vi.mock('../controlJuego/ControlJuego', () => ({
    ControlJuego: ({ estadoJuego }: { estadoJuego: string }) => (
        <div>Estado del juego: {estadoJuego}</div>
    )
}))

const mockProps = {
    manoDealer: [{ palo: '♠', valor: 'K' }] as unknown as Carta[],
    manoJugador: [{ palo: '♥', valor: '5' }] as unknown as Carta[],
    puntuacionDealer: 18,
    puntuacionJugador: 20,
    verCartaDealer: true,
    estadoJuego: 'jugadorGanador',
    retoActivo: false,
    onInitiateChallenge: vi.fn()
}

describe('Tablero', () => {
    it('muestra el mensaje de victoria del jugador', () => {
        render(<Tablero {...mockProps} estadoJuego="jugadorGanador" />)
        expect(screen.getByText(/🎉 ¡Ganaste!/i)).toBeInTheDocument()
    })

    it('muestra el mensaje de victoria del dealer', () => {
        render(<Tablero {...mockProps} estadoJuego="dealerGanador" />)
        expect(screen.getByText(/😔 Ganó el dealer/i)).toBeInTheDocument()
    })

    it('muestra el mensaje de empate', () => {
        render(<Tablero {...mockProps} estadoJuego="tie" />)
        expect(screen.getByText(/🤝 Empate/i)).toBeInTheDocument()
    })

    it('muestra el mensaje de perder por pasarse', () => {
        render(<Tablero {...mockProps} estadoJuego="bust" />)
        expect(screen.getByText(/💥 Te pasaste de 21/i)).toBeInTheDocument()
    })

    it('muestra el mensaje por defecto al inicio', () => {
        render(<Tablero {...mockProps} estadoJuego="idle" />)
        expect(screen.getByText(/🎓 Responde preguntas para jugar/i)).toBeInTheDocument()
    })

    it('renderiza ambas manos con las puntuaciones correctas', () => {
        render(<Tablero {...mockProps} />)
        expect(screen.getByText('Dealer')).toBeInTheDocument()
        expect(screen.getByText('Puntuación: 18')).toBeInTheDocument()
        expect(screen.getByText('Tu mano')).toBeInTheDocument()
        expect(screen.getByText('Puntuación: 20')).toBeInTheDocument()
    })

    it('renderiza el componente de control con el estado actual del juego', () => {
        render(<Tablero {...mockProps} estadoJuego="jugadorGanador" />)
        expect(screen.getByText('Estado del juego: jugadorGanador')).toBeInTheDocument()
    })
})