import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Carta } from './Carta'

describe('Carta', () => {
    const cartaMock = {
        valor: 'Q',
        color: 'corazones',
        valorNumerico: 10,
    } as const

    it('muestra la carta oculta si cartaOculta es true', () => {
        render(<Carta carta={cartaMock} cartaOculta />)

        const simboloOculto = screen.getByText('?')
        expect(simboloOculto).toBeInTheDocument()
        expect(simboloOculto).toHaveClass('text-2xl')
        expect(simboloOculto.parentElement).toHaveClass('bg-blue-600')
    })

    it('muestra el valor y símbolo si la carta no está oculta', () => {
        render(<Carta carta={cartaMock} />)

        // Verifica los valores
        expect(screen.getAllByText('Q')).toHaveLength(2)
        expect(screen.getByText('♥️')).toBeInTheDocument()
    })

    it('usa color rojo para corazones', () => {
        render(<Carta carta={{ valor: '10', color: 'corazones', valorNumerico: 10 }} />)

        const valores = screen.getAllByText('10')
        valores.forEach((element) => {
            expect(element).toHaveClass('text-red-500')
        })
    })

    it('usa color rojo para diamantes', () => {
        render(<Carta carta={{ valor: 'J', color: 'diamantes', valorNumerico: 10 }} />)

        const valores = screen.getAllByText('J')
        valores.forEach((element) => {
            expect(element).toHaveClass('text-red-500')
        })
        expect(screen.getByText('♦️')).toBeInTheDocument()
    })

    it('usa color negro para espadas y picas', () => {
        const coloresNegros = ['espadas', 'picas'] as const

        coloresNegros.forEach((color) => {
            render(<Carta carta={{ valor: '7', color, valorNumerico: 7 }} />)

            const valores = screen.getAllByText('7')
            valores.forEach((element) => {
                expect(element).toHaveClass('text-black')
            })
        })
    })
})
