import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BarraProgeso from './BarraProgreso'

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
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar).toBeInTheDocument()
        expect(progressBar).toHaveAttribute('data-max', '100')
        expect(progressBar.className).toMatch(/w-48/)
    })

    it('muestra correctamente la puntuación', () => {
        render(<BarraProgeso {...props} />)
        expect(screen.getByText('120')).toBeInTheDocument()
        expect(screen.getByText(/puntos/i)).toBeInTheDocument()
    })
})
