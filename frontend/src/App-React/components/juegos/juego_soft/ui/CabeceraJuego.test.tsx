import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from './cabeceraJuego'

describe('Header', () => {
  const props = {
    puntos: 10,
    juegosJugados: 2,
  }

  it('muestra el título correctamente', () => {
    render(<Header {...props} />)
    expect(screen.getByText('🃏 Jack & Code')).toBeInTheDocument()
  })

  it('muestra los puntos correctamente', () => {
    render(<Header {...props} />)
    expect(screen.getByText('🎯 10 puntos')).toBeInTheDocument()
  })

  it('muestra el número de partida correctamente', () => {
    render(<Header {...props} />)
    expect(screen.getByText('Partida 2/4')).toBeInTheDocument()
  })

  it('actualiza correctamente si cambian los props', () => {
    const { rerender } = render(<Header {...props} />)

    expect(screen.getByText('🎯 10 puntos')).toBeInTheDocument()
    expect(screen.getByText('Partida 2/4')).toBeInTheDocument()

    rerender(<Header puntos={25} juegosJugados={4} />)

    expect(screen.getByText('🎯 25 puntos')).toBeInTheDocument()
    expect(screen.getByText('Partida 4/4')).toBeInTheDocument()
  })
})
