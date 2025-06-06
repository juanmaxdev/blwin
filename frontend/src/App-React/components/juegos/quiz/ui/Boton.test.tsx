import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Boton } from './Boton'

// Helper para limpiar clases (opcional)
const getClass = (el: HTMLElement) => el.className.split(/\s+/)

describe('Boton', () => {
  it('renderiza con el texto proporcionado', () => {
    render(<Boton>Click aquí</Boton>)
    expect(screen.getByRole('button', { name: /click aquí/i })).toBeInTheDocument()
  })

  it('usa la variante por defecto si no se pasa ninguna', () => {
    render(<Boton>Por defecto</Boton>)
    const button = screen.getByRole('button')
    expect(getClass(button)).toContain('bg-primary')
  })

  it('aplica correctamente la variante "destructive"', () => {
    render(<Boton variant="destructive">Eliminar</Boton>)
    const button = screen.getByRole('button')
    expect(getClass(button)).toContain('bg-destructive')
  })

  it('aplica correctamente el tamaño "lg"', () => {
    render(<Boton size="lg">Grande</Boton>)
    const button = screen.getByRole('button')
    expect(getClass(button)).toContain('h-11')
    expect(getClass(button)).toContain('px-8')
  })

  it('aplica clases personalizadas si se pasan via className', () => {
    render(<Boton className="custom-class">Personalizado</Boton>)
    const button = screen.getByRole('button')
    expect(getClass(button)).toContain('custom-class')
  })

  it('se desactiva correctamente con disabled', () => {
    render(<Boton disabled>Desactivado</Boton>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('renderiza como child si asChild está en true', () => {
    render(
      <Boton asChild>
        <a href="/test">Enlace</a>
      </Boton>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test')
  })
})
