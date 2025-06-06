
import { useState, useEffect } from "react"
import { Preguntas, type Pregunta } from "../../../components/juegos/quiz/data/Preguntas"
import HeaderJuego from "../../../components/juegos/quiz/HeaderJuego"
import BarraProgeso from "../../../components/juegos/quiz/Barra-progresion"
import PreguntaCarta from "../../../components/juegos/quiz/Carta-pregunta"
import ResultadoJuego from "../../../components/juegos/quiz/Resultado-Juego"





const QUESTIONS_PER_GAME = 8

export default function ProgrammingQuizGame() {
  const [questions, setQuestions] = useState<Pregunta[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])

  
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    
    const shuffledQuestions = [...Preguntas].sort(() => 0.5 - Math.random()).slice(0, QUESTIONS_PER_GAME)

    setQuestions(shuffledQuestions)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameFinished(false)
    setAnsweredQuestions([])
  }

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return 
    setSelectedAnswer(answer)
    setShowResult(true)

    if (answer === questions[currentQuestion].respuestaCorrecta) {
      setScore(score + 10)
    }

    setAnsweredQuestions([...answeredQuestions, currentQuestion])
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameFinished(true)
    }
  }

  const resetGame = () => {
    initializeGame()
  }


  const progress = questions.length > 0 ? ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100 : 0

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
  }

  if (gameFinished) {
    return <ResultadoJuego score={score} maxScore={questions.length * 10} onRestart={resetGame} />
  }

  const question = questions[currentQuestion];

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 px-4">
    <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
      
      <HeaderJuego />

      <BarraProgeso
        preguntaActual={currentQuestion}
        preguntasTotales={questions.length}
        progreso={progress}
        puntuacion={score}
      />

      <PreguntaCarta
        pregunta={question}
        respuestaSeleccionada={selectedAnswer}
        mostrarResultados={showResult}
        onPreguntaSeleccionada={handleAnswerSelect}
        onSiguientePregunta={handleNextQuestion}
        esUltimaPregunta={currentQuestion === questions.length - 1}
      />
      
    </div>
  </div>
)
}

