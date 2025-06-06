import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {
    Carta,
    CartaHeader,
    CartaFooter,
    CartaTitle,
    CartaDescription,
    CartaContent,
} from './Carta'

describe('Componentes Carta', () => {
    it('renderiza el componente Carta con children', () => {
        render(<Carta>Contenido principal</Carta>)
        expect(screen.getByText('Contenido principal')).toBeInTheDocument()
    })

    it('renderiza CartaHeader con children', () => {
        render(<CartaHeader>Encabezado</CartaHeader>)
        expect(screen.getByText('Encabezado')).toBeInTheDocument()
    })

    it('renderiza CartaTitle como un h3', () => {
        render(<CartaTitle>Mi título</CartaTitle>)
        const title = screen.getByText('Mi título')
        expect(title.tagName).toBe('H3')
    })

    it('renderiza CartaDescription como un párrafo', () => {
        render(<CartaDescription>Descripción aquí</CartaDescription>)
        const desc = screen.getByText('Descripción aquí')
        expect(desc.tagName).toBe('P')
    })

    it('renderiza CartaContent con contenido', () => {
        render(<CartaContent>Contenido extra</CartaContent>)
        expect(screen.getByText('Contenido extra')).toBeInTheDocument()
    })

    it('renderiza CartaFooter con contenido', () => {
        render(<CartaFooter>Pie de carta</CartaFooter>)
        expect(screen.getByText('Pie de carta')).toBeInTheDocument()
    })

    it('aplica clases personalizadas si se pasa className', () => {
        render(<Carta className="mi-clase">Texto</Carta>)
        const el = screen.getByText('Texto')
        expect(el).toHaveClass('mi-clase')
    })
})
