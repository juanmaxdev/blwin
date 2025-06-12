import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { ComoJugar } from './ComoJugar'

describe('ComoJugar', () => {
    it('renderiza el título correctamente', () => {
        render(<ComoJugar />)
        expect(screen.getByText(/Cómo Jugar/i)).toBeInTheDocument()
    })

    it('muestra todos los pasos numerados del 1 al 4', () => {
        render(<ComoJugar />)

        expect(screen.getByText('1️⃣')).toBeInTheDocument()
        expect(screen.getByText('Haz clic en cualquier botón de acción')).toBeInTheDocument()

        expect(screen.getByText('2️⃣')).toBeInTheDocument()
        expect(screen.getByText('Responde la pregunta aleatoria de programación')).toBeInTheDocument()

        expect(screen.getByText('3️⃣')).toBeInTheDocument()
        expect(screen.getByText('Si es correcta, se ejecuta la acción')).toBeInTheDocument()

        expect(screen.getByText('4️⃣')).toBeInTheDocument()
        expect(screen.getByText('Completa 4 partidas para ver tu resumen')).toBeInTheDocument()
    })

    it('renderiza una lista con 4 elementos', () => {
        render(<ComoJugar />)
        const listItems = screen.getAllByRole('listitem')
        expect(listItems).toHaveLength(4)
    })
})