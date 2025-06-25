import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { TiposPreguntas } from './TiposPreguntas'

describe('TiposPreguntas', () => {
    it('renderiza el título principal', () => {
        render(<TiposPreguntas />)
        expect(screen.getByText(/🎲 Tipos de Preguntas/i)).toBeInTheDocument()
    })

    it('muestra correctamente la sección de "Teoría"', () => {
        render(<TiposPreguntas />)
        const teoriaRow = screen.getByText('Teoría').closest('div')!
        expect(within(teoriaRow).getByText('📚')).toBeInTheDocument()
        expect(within(teoriaRow).getByText('15 preguntas')).toHaveClass('text-blue-600')
    })

    it('muestra correctamente la sección de "Completar Código"', () => {
        render(<TiposPreguntas />)
        const completarRow = screen.getByText('Completar Código').closest('div')!
        expect(within(completarRow).getByText('🧩')).toBeInTheDocument()
        expect(within(completarRow).getByText('15 preguntas')).toHaveClass('text-green-600')
    })

    it('muestra correctamente la sección de "Predecir Output"', () => {
        render(<TiposPreguntas />)
        const outputRow = screen.getByText('Predecir Output').closest('div')!
        expect(within(outputRow).getByText('🔮')).toBeInTheDocument()
        expect(within(outputRow).getByText('15 preguntas')).toHaveClass('text-purple-600')
    })
})