import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ControlJuego } from './ControlJuego'

// Mock del botón si es un wrapper personalizado
vi.mock('../../../ui/Button', () => ({
  default: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  )
}))

describe('ControlJuego', () => {
  const setup = (estadoJuego: string, retoActivo: boolean = false) => {
    const onInitiateRetos = vi.fn()
    render(
      <ControlJuego
        estadoJuego={estadoJuego}
        retoActivo={retoActivo}
        onInitiateRetos={onInitiateRetos}
      />
    )
    return { onInitiateRetos }
  }

  it('desactiva todos los botones si hay reto activo', () => {
    setup('playing', true)
    expect(screen.getByText('☕ Pedir Carta')).toBeDisabled()
    expect(screen.getByText('🔷 Plantarse')).toBeDisabled()
    expect(screen.getByText('📘 Siguiente Partida')).toBeDisabled()
  })

  it('habilita botones de juego solo cuando estado es "playing" y no hay reto', () => {
    setup('playing', false)
    expect(screen.getByText('☕ Pedir Carta')).toBeEnabled()
    expect(screen.getByText('🔷 Plantarse')).toBeEnabled()
    expect(screen.getByText('📘 Siguiente Partida')).toBeDisabled()
  })

  it('habilita botón de "Siguiente Partida" solo cuando no está jugando ni hay reto', () => {
    setup('ended', false)
    expect(screen.getByText('☕ Pedir Carta')).toBeDisabled()
    expect(screen.getByText('🔷 Plantarse')).toBeDisabled()
    expect(screen.getByText('📘 Siguiente Partida')).toBeEnabled()
  })

  it('dispara la acción "golpear" al hacer clic en "Pedir Carta"', () => {
    const { onInitiateRetos } = setup('playing', false)
    fireEvent.click(screen.getByText('☕ Pedir Carta'))
    expect(onInitiateRetos).toHaveBeenCalledWith('golpear')
  })

  it('dispara la acción "parar" al hacer clic en "Plantarse"', () => {
    const { onInitiateRetos } = setup('playing', false)
    fireEvent.click(screen.getByText('🔷 Plantarse'))
    expect(onInitiateRetos).toHaveBeenCalledWith('parar')
  })

  it('dispara la acción "nuevoJuego" al hacer clic en "Siguiente Partida"', () => {
    const { onInitiateRetos } = setup('ended', false)
    fireEvent.click(screen.getByText('📘 Siguiente Partida'))
    expect(onInitiateRetos).toHaveBeenCalledWith('nuevoJuego')
  })

  it('coincide con snapshot básico (estado: playing, sin reto)', () => {
    const { container } = render(
      <ControlJuego
        estadoJuego="playing"
        retoActivo={false}
        onInitiateRetos={vi.fn()}
      />
    )
    expect(container).toMatchSnapshot()
  })
})
