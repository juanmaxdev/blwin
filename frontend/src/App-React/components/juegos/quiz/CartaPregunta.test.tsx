import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import PreguntaCarta from './CartaPregunta'

vi.mock('./ui/Boton', () => ({
    Boton: ({ children, onClick, ...props }: any) => (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    ),
}))
vi.mock('./ui/Carta', () => ({
    Carta: ({ children }: any) => <div>{children}</div>,
    CartaHeader: ({ children }: any) => <header>{children}</header>,
    CartaTitle: ({ children }: any) => <h1>{children}</h1>,
    CartaDescription: ({ children }: any) => <p>{children}</p>,
    CartaContent: ({ children }: any) => <main>{children}</main>,
}))

const preguntaMock = {
    id: 1,
    codigo: 'console.log("Hola Mundo")',
    opciones: ['JavaScript', 'Python', 'Ruby', 'C++'],
    respuestaCorrecta: 'JavaScript',
    explicacion: 'Es JavaScript porque usa console.log()',
}

describe('PreguntaCarta', () => {
    const defaultProps = {
        pregunta: preguntaMock,
        respuestaSeleccionada: null,
        mostrarResultados: false,
        onPreguntaSeleccionada: vi.fn(),
        onSiguientePregunta: vi.fn(),
        esUltimaPregunta: false,
    }

    it('renderiza la pregunta y opciones', () => {
        render(<PreguntaCarta {...defaultProps} />)

        expect(screen.getByText(/¿qué lenguaje de programación es este\?/i)).toBeInTheDocument()
        expect(screen.getByText(preguntaMock.codigo)).toBeInTheDocument()

        preguntaMock.opciones.forEach((op) => {
            expect(screen.getByText(op)).toBeInTheDocument()
        })
    })

    it('llama a onPreguntaSeleccionada cuando se hace clic en una opción', () => {
        const onPreguntaSeleccionada = vi.fn()
        render(<PreguntaCarta {...defaultProps} onPreguntaSeleccionada={onPreguntaSeleccionada} />)

        fireEvent.click(screen.getByText('Python'))
        expect(onPreguntaSeleccionada).toHaveBeenCalledWith('Python')
    })

    it('muestra mensaje de "Correcto" si se responde bien', () => {
        render(
            <PreguntaCarta
                {...defaultProps}
                respuestaSeleccionada="JavaScript"
                mostrarResultados
            />
        )

        expect(screen.getByText(/¡correcto!/i)).toBeInTheDocument()
    })

    it('muestra mensaje de "Incorrecto" si se responde mal', () => {
        render(
            <PreguntaCarta
                {...defaultProps}
                respuestaSeleccionada="Ruby"
                mostrarResultados
            />
        )

        expect(screen.getByText(/incorrecto/i)).toBeInTheDocument()
        expect(screen.getByText(/la respuesta era javascript/i)).toBeInTheDocument()
    })

    it('muestra la explicación si está disponible', () => {
        render(
            <PreguntaCarta
                {...defaultProps}
                respuestaSeleccionada="Ruby"
                mostrarResultados
            />
        )

        expect(screen.getByText(/explicación:/i)).toBeInTheDocument()
        expect(screen.getByText(/es javascript porque usa console\.log/i)).toBeInTheDocument()
    })

    it('muestra el botón "Siguiente Pregunta" si no es la última', () => {
        render(
            <PreguntaCarta
                {...defaultProps}
                respuestaSeleccionada="JavaScript"
                mostrarResultados
                esUltimaPregunta={false}
            />
        )

        expect(screen.getByText(/siguiente pregunta/i)).toBeInTheDocument()
    })

    it('muestra el botón "Ver Resultados" si es la última pregunta', () => {
        render(
            <PreguntaCarta
                {...defaultProps}
                respuestaSeleccionada="JavaScript"
                mostrarResultados
                esUltimaPregunta={true}
            />
        )

        expect(screen.getByText(/ver resultados/i)).toBeInTheDocument()
    })

    it('llama a onSiguientePregunta cuando se hace clic en el botón', () => {
        const onSiguientePregunta = vi.fn()
        render(
            <PreguntaCarta
                {...defaultProps}
                respuestaSeleccionada="JavaScript"
                mostrarResultados
                onSiguientePregunta={onSiguientePregunta}
            />
        )

        fireEvent.click(screen.getByText(/siguiente pregunta/i))
        expect(onSiguientePregunta).toHaveBeenCalledOnce()
    })
})
