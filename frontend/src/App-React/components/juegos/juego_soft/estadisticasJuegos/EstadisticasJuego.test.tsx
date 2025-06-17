import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { EstadisticasJuego } from './EstadisticasJuego'

describe('EstadisticasJuego', () => {
  it('muestra puntuación del jugador y del dealer', () => {
    render(
      <EstadisticasJuego
        puntuacionJugador={50}
        puntuacionDealer={30}
        puntuacion={80}
        preguntasRespondidas={10}
        respuestasCorrectas={7}
      />
    )

    expect(screen.getByText('Tu puntuación:')).toBeInTheDocument()
    expect(screen.getByText('50')).toHaveClass('text-2xl', 'text-blue-600')

    expect(screen.getByText('Dealer:')).toBeInTheDocument()
    expect(screen.getByText('30')).toHaveClass('text-2xl', 'text-red-600')
  })

  it('muestra puntos totales y proporción de correctas', () => {
    render(
      <EstadisticasJuego
        puntuacionJugador={0}
        puntuacionDealer={0}
        puntuacion={25}
        preguntasRespondidas={5}
        respuestasCorrectas={3}
      />
    )

    expect(screen.getByText('🏆 Puntos:')).toBeInTheDocument()
    expect(screen.getByText('25')).toHaveClass('text-purple-600')

    expect(screen.getByText('✅ Correctas:')).toBeInTheDocument()
    expect(screen.getByText('3/5')).toHaveClass('text-green-600')
  })

  it('calcula accuracy correctamente y muestra en verde si ≥ 70%', () => {
    // 7 de 10 → 70%
    render(
      <EstadisticasJuego
        puntuacionJugador={0}
        puntuacionDealer={0}
        puntuacion={0}
        preguntasRespondidas={10}
        respuestasCorrectas={7}
      />
    )

    // Precisión: 70%
    const precision = screen.getByText('70%')
    expect(precision).toBeInTheDocument()
    expect(precision).toHaveClass('font-bold', 'text-green-600')
  })

  it('calcula accuracy correctamente y muestra en rojo si < 70%', () => {
    // 2 de 10 → 20%
    render(
      <EstadisticasJuego
        puntuacionJugador={0}
        puntuacionDealer={0}
        puntuacion={0}
        preguntasRespondidas={10}
        respuestasCorrectas={2}
      />
    )

    const precision = screen.getByText('20%')
    expect(precision).toBeInTheDocument()
    expect(precision).toHaveClass('font-bold', 'text-red-600')
  })

  it('muestra precisión 0% si no se han respondido preguntas', () => {
    render(
      <EstadisticasJuego
        puntuacionJugador={0}
        puntuacionDealer={0}
        puntuacion={0}
        preguntasRespondidas={0}
        respuestasCorrectas={0}
      />
    )

    const precision = screen.getByText('0%')
    expect(precision).toBeInTheDocument()
    expect(precision).toHaveClass('font-bold', 'text-red-600')
  })
})
