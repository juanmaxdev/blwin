import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { InformacionCarta } from './InformacionCarta'

describe('InformacionCarta', () => {
    it('muestra el título con el icono', () => {
        render(
            <InformacionCarta titulo="Ejemplo" icono="🧠">
                <p>Contenido de prueba</p>
            </InformacionCarta>
        )

        expect(screen.getByText('🧠 Ejemplo:')).toBeInTheDocument()
    })

    it('muestra el contenido hijo correctamente', () => {
        render(
            <InformacionCarta titulo="Datos" icono="📊">
                <p>Estadísticas de juego</p>
            </InformacionCarta>
        )

        expect(screen.getByText('Estadísticas de juego')).toBeInTheDocument()
    })
})