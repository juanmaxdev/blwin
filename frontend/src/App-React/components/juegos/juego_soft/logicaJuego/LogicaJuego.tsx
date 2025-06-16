import { useState, useCallback } from "react"
import type { EstadoJuego, Retos } from "../types/Juego"
import { CrearMazo, CalcularValorCarta } from "../utils/Mazo"
import { preguntasProgramacion } from "../data/preguntas"

export function useGameLogic() {
  const [estadoJuego, setEstadoJuego] = useState<EstadoJuego>({
    manoJugador: [],
    manoDealer: [],
    tablero: CrearMazo(),
    estadoJuego: "jugando",
    puntuacionJugador: 0,
    puntuacionDealer: 0,
    verCartaDealer: false,
    retoActivo: false,
    retosActuales: null,
    puntuacion: 0,
    preguntasRespondidas: 0,
    preguntasCorrectas: 0,
    partidasJugador: 0,
    juegoFinalizado: false,
  })

  const initializeGame = useCallback(() => {
    const newDeck = CrearMazo()
    const manoJugador = [newDeck[0], newDeck[2]]
    const manoDealer = [newDeck[1], newDeck[3]]

    setEstadoJuego((prev) => ({
      ...prev,
      manoJugador,
      manoDealer,
      tablero: newDeck.slice(4),
      estadoJuego: "jugando",
      puntuacionJugador: CalcularValorCarta(manoJugador),
      puntuacionDealer: CalcularValorCarta(manoDealer),
      verCartaDealer: false,
      retoActivo: false,
      retosActuales: null,
      partidasJugador: prev.partidasJugador === 0 ? 1 : prev.partidasJugador,
    }))
  }, [])

  const getRandomRetos = useCallback((action: Retos["accion"]): Retos => {
    const allQuestions = [...preguntasProgramacion]

    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]]
    }

    const selectedQuestion = { ...allQuestions[0] }
    selectedQuestion.accion = action
    return selectedQuestion
  }, [])

  const initiateRetos = useCallback(
    (action: Retos["accion"]) => {
      const Retos = getRandomRetos(action)
      setEstadoJuego((prev) => ({ ...prev, retoActivo: true, retosActuales: Retos }))
    },
    [getRandomRetos],
  )

  const executeHit = useCallback(() => {
    setEstadoJuego((prev) => {
      if (prev.estadoJuego !== "jugando" || prev.tablero.length === 0) return prev

      const newCard = prev.tablero[0]
      const newPlayerHand = [...prev.manoJugador, newCard]
      const newScore = CalcularValorCarta(newPlayerHand)

      return {
        ...prev,
        manoJugador: newPlayerHand,
        tablero: prev.tablero.slice(1),
        puntuacionJugador: newScore,
        estadoJuego: newScore > 21 ? "bust" : "jugando",
      }
    })
  }, [])

  const executeStand = useCallback(() => {
    setEstadoJuego((prev) => {
      if (prev.estadoJuego !== "jugando") return prev

      const newDealerHand = [...prev.manoDealer]
      let newDeck = [...prev.tablero]
      let puntuacionDealer = CalcularValorCarta(newDealerHand)

      while (puntuacionDealer < 17 && newDeck.length > 0) {
        newDealerHand.push(newDeck[0])
        newDeck = newDeck.slice(1)
        puntuacionDealer = CalcularValorCarta(newDealerHand)
      }

      let status: EstadoJuego["estadoJuego"] = "tie"
      if (puntuacionDealer > 21) status = "jugadorGanador"
      else if (prev.puntuacionJugador > puntuacionDealer) status = "jugadorGanador"
      else if (puntuacionDealer > prev.puntuacionJugador) status = "dealerGanador"

      return {
        ...prev,
        manoDealer: newDealerHand,
        tablero: newDeck,
        puntuacionDealer,
        estadoJuego: status,
        verCartaDealer: true,
      }
    })
  }, [])

  const executeNewGame = useCallback(() => {
    setEstadoJuego((prev) => {
      const newGamesPlayed = prev.partidasJugador + 1

      if (newGamesPlayed > 1) {
        return { ...prev, juegoFinalizado: true }
      }

      const newDeck = CrearMazo()
      const manoJugador = [newDeck[0], newDeck[2]]
      const manoDealer = [newDeck[1], newDeck[3]]

      return {
        ...prev,
        manoJugador,
        manoDealer,
        tablero: newDeck.slice(4),
        estadoJuego: "jugando",
        puntuacionJugador: CalcularValorCarta(manoJugador),
        puntuacionDealer: CalcularValorCarta(manoDealer),
        verCartaDealer: false,
        retoActivo: false,
        retosActuales: null,
        partidasJugador: newGamesPlayed,
      }
    })
  }, [])

  const handleRetosComplete = useCallback(
    (correct: boolean) => {
      setEstadoJuego((prev) => {
        if (!prev.retosActuales) return prev

        const pointsEarned = correct ? 10 : -5
        const newScore = Math.max(0, prev.puntuacion + pointsEarned)

        return {
          ...prev,
          puntuacion: newScore,
          preguntasRespondidas: prev.preguntasRespondidas + 1,
          preguntasCorrectas: prev.preguntasCorrectas + (correct ? 1 : 0),
          retoActivo: false,
          retosActuales: null,
        }
      })

      if (correct && estadoJuego.retosActuales) {
        switch (estadoJuego.retosActuales.accion) {
          case "pedirCarta":
            executeHit()
            break
          case "plantarse":
            executeStand()
            break
          case "siguientePartida":
            executeNewGame()
            break
        }
      }
    },
    [estadoJuego.retosActuales, executeHit, executeStand, executeNewGame],
  )

  const restartSession = useCallback(() => {
    setEstadoJuego({
      manoJugador: [],
      manoDealer: [],
      tablero: CrearMazo(),
      estadoJuego: "jugando",
      puntuacionJugador: 0,
      puntuacionDealer: 0,
      verCartaDealer: false,
      retoActivo: false,
      retosActuales: null,
      puntuacion: 0,
      preguntasRespondidas: 0,
      preguntasCorrectas: 0,
      partidasJugador: 0,
      juegoFinalizado: false,
    })
    setTimeout(initializeGame, 100)
  }, [initializeGame])

  const closeRetosModal = useCallback(() => {
    setEstadoJuego((prev) => ({ ...prev, retoActivo: false, retosActuales: null }))
  }, [])

  return {
    estadoJuego,
    initializeGame,
    initiateRetos,
    handleRetosComplete,
    restartSession,
    closeRetosModal,
  }
}
