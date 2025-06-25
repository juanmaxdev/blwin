import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeaderJuego from './HeaderJuego'

describe('HeaderJuego', () => {
    it('renderiza el título principal correctamente', () => {
        render(<HeaderJuego />)
        expect(
            screen.getByRole('heading', { name: /quiz de lenguajes de programación/i })
        ).toBeInTheDocument()
    })

    it('muestra el subtítulo explicativo', () => {
        render(<HeaderJuego />)
        expect(
            screen.getByText(/identifica el lenguaje de programación del código mostrado/i)
        ).toBeInTheDocument()
    })

    it('usa las clases de Tailwind esperadas', () => {
        const { container } = render(<HeaderJuego />)
        const title = container.querySelector('h1')
        expect(title).toHaveClass('text-3xl', 'font-bold', 'text-gray-900')
    })
})
