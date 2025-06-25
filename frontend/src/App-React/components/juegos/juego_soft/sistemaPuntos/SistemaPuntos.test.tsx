import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SistemaPuntos } from './SistemaPuntos'

describe('SistemaPuntos', () => {
    it('renderiza el título correctamente', () => {
        render(<SistemaPuntos />)
        expect(screen.getByText(/Sistema de Puntos/i)).toBeInTheDocument()
    })

    it('muestra el texto para respuesta correcta con +10 puntos', () => {
        render(<SistemaPuntos />)
        expect(screen.getByText('Respuesta correcta:')).toBeInTheDocument()
        expect(screen.getByText('+10 puntos')).toHaveClass('text-green-600')
    })

    it('muestra el texto para respuesta incorrecta con -5 puntos', () => {
        render(<SistemaPuntos />)
        expect(screen.getByText('Respuesta incorrecta:')).toBeInTheDocument()
        expect(screen.getByText('-5 puntos')).toHaveClass('text-red-600')
    })
})
