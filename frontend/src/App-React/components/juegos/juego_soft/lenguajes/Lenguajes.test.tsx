import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Lenguajes } from './Lenguajes'

describe('Lenguajes', () => {
    it('muestra el título correctamente', () => {
        render(<Lenguajes />)
        expect(screen.getByText(/Lenguajes:/i)).toBeInTheDocument()
    })

    it('muestra Java con su icono y descripción', () => {
        render(<Lenguajes />)
        expect(screen.getByText('☕')).toBeInTheDocument()
        expect(screen.getByText('Java')).toBeInTheDocument()
        expect(screen.getByText('POO, Collections')).toHaveClass('text-orange-600')
    })

    it('muestra C# con su icono y descripción', () => {
        render(<Lenguajes />)
        expect(screen.getByText('🔷')).toBeInTheDocument()
        expect(screen.getByText('C#')).toBeInTheDocument()
        expect(screen.getByText('Types, LINQ')).toHaveClass('text-purple-600')
    })

    it('muestra TypeScript con su icono y descripción', () => {
        render(<Lenguajes />)
        expect(screen.getByText('📘')).toBeInTheDocument()
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('Interfaces, Generics')).toHaveClass('text-blue-600')
    })

    it('muestra JavaScript con su icono y descripción', () => {
        render(<Lenguajes />)
        expect(screen.getByText('🟨')).toBeInTheDocument()
        expect(screen.getByText('JavaScript')).toBeInTheDocument()
        expect(screen.getByText('ES6+, DOM')).toHaveClass('text-yellow-600')
    })
})
