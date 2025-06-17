import { render, screen } from "@testing-library/react"
import { JuegoBlackjack } from "./JuegoBlackjack"
import * as LogicaJuego from "../../../components/juegos/juego_soft/logicaJuego/LogicaJuego"
import * as Puntuacion from "../../../hooks/MandarPuntuacion"
import type { EstadoJuego, Retos } from "../../../components/juegos/juego_soft/types/Juego"

// Mocks de componentes
jest.mock("../../../components/juegos/juego_soft/ui/cabeceraJuego", () => ({
    Header: ({ puntos }: { puntos: number }) => <div>Header: {puntos}</div>,
}))
jest.mock("../../../components/juegos/juego_soft/ui/TableroJuego", () => ({
    Tablero: () => <div>Tablero</div>,
}))
jest.mock("../../../components/juegos/juego_soft/ui/BarraLateral", () => ({
    BarraLateral: () => <div>BarraLateral</div>,
}))
jest.mock("../../../components/juegos/juego_soft/modalReto/ModalReto", () => ({
    RetosModal: () => <div>ModalReto</div>,
}))
jest.mock("../../../components/juegos/juego_soft/ui/ResumenPartida", () => ({
    ResumenPartida: () => <div>ResumenPartida</div>,
}))

describe("JuegoBlackjack", () => {
    const initializeGame = jest.fn()

    const mockEstado: EstadoJuego = {
        manoJugador: [],
        manoDealer: [],
        tablero: [],
        estadoJuego: "jugando",
        puntuacionJugador: 0,
        puntuacionDealer: 0,
        verCartaDealer: false,
        retoActivo: false,
        retosActuales: null,
        puntuacion: 10,
        preguntasRespondidas: 3,
        preguntasCorrectas: 2,
        partidasJugador: 2,
        juegoFinalizado: false,
    }

    const mockUseGameLogic = {
        estadoJuego: mockEstado,
        initializeGame,
        initiateRetos: jest.fn(),
        handleRetosComplete: jest.fn(),
        restartSession: jest.fn(),
        closeRetosModal: jest.fn(),
    }

    beforeEach(() => {
        jest.spyOn(LogicaJuego, "useGameLogic").mockReturnValue(mockUseGameLogic)
    })

    it("renderiza correctamente el juego cuando no ha finalizado", () => {
        render(<JuegoBlackjack />)

        expect(screen.getByText("Header: 10")).toBeInTheDocument()
        expect(screen.getByText("Tablero")).toBeInTheDocument()
        expect(screen.getByText("BarraLateral")).toBeInTheDocument()
        expect(screen.queryByText("ResumenPartida")).not.toBeInTheDocument()
    })

    it("renderiza el resumen cuando el juego ha finalizado", () => {
        jest.spyOn(LogicaJuego, "useGameLogic").mockReturnValue({
            ...mockUseGameLogic,
            estadoJuego: { ...mockEstado, juegoFinalizado: true },
        })

        const mandarPuntuacionMock = jest.spyOn(Puntuacion, "mandarPuntuacion")

        render(<JuegoBlackjack />)

        expect(screen.getByText("ResumenPartida")).toBeInTheDocument()
        expect(mandarPuntuacionMock).toHaveBeenCalledWith("blackjack", 10)
    })

    it("renderiza el modal de retos cuando hay un reto activo", () => {
        const retoActivo: Retos = {
            id: "1",
            tipo: "teoría",
            lenguaje: "JavaScript",
            titulo: "¿Qué es JS?",
            descripcion: "Descripción de prueba",
            preguntas: "¿JavaScript es un lenguaje de...?",
            opciones: ["marcado", "estilo", "programación"],
            respuestaCorrecta: "programación",
            explicacion: "Es un lenguaje de programación.",
            accion: "siguientePartida",
            dificultad: "fácil",
        }

        jest.spyOn(LogicaJuego, "useGameLogic").mockReturnValue({
            ...mockUseGameLogic,
            estadoJuego: {
                ...mockEstado,
                retoActivo: true,
                retosActuales: retoActivo,
            },
        })

        render(<JuegoBlackjack />)

        expect(screen.getByText("ModalReto")).toBeInTheDocument()
    })
})