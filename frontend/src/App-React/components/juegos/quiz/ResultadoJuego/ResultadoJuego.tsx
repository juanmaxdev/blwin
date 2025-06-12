import { Boton } from "../ui/Boton"
import { Carta, CartaHeader, CartaTitle, CartaDescription, CartaContent } from "../ui/Carta"
import { Progreso } from "../ui/Progreso"
import { RotateCcw, Trophy, Play } from "lucide-react"
import Ranking from "../../../ranking/Ranking"


interface ResultadoJuegoProps {
  score: number
  maxScore: number
  onRestart: () => void
}

export default function ResultadoJuego({ score, maxScore, onRestart }: ResultadoJuegoProps) {
  const percentage = (score / maxScore) * 100;
  const juegoNombre = "Quiz";

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-200 px-4">
    <div className="flex flex-row gap-8 items-start">
      
      {/* Carta fija */}
      <Carta className="w-[500px] bg-white rounded-xl shadow-xl p-8 space-y-6">
        <CartaHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <CartaTitle className="text-3xl">¡Juego Completado!</CartaTitle>
          <CartaDescription className="text-lg">
            Has terminado el quiz de lenguajes de programación
          </CartaDescription>
        </CartaHeader>
        <CartaContent className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">{score}</div>
            <div className="text-muted-foreground">de {maxScore} puntos posibles</div>
            <div className="text-lg font-semibold">
              {percentage >= 80
                ? "¡Excelente!"
                : percentage >= 60
                ? "¡Bien hecho!"
                : percentage >= 40
                ? "Puedes mejorar"
                : "Sigue practicando"}
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Precisión</div>
            <Progreso value={percentage} className="h-3" />
            <div className="text-sm mt-1">{percentage.toFixed(1)}%</div>
          </div>

          <div className="flex gap-4">
            <Boton size="lg" className="w-full" asChild onClick={() => window.parent.location.reload()}>
              <div className="flex items-center justify-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Volver al Inicio
              </div>
            </Boton>

            <Boton onClick={onRestart} size="lg" className="w-full">
              <Play className="mr-2 h-4 w-4" />
              Jugar de Nuevo
            </Boton>
          </div>
        </CartaContent>
      </Carta>

      {/* Ranking fijo */}
      <div className="w-[400px] bg-white p-6 rounded-xl shadow-lg w-full">
        <Ranking
          tituloRanking={"Top 5 Juego-Preguntas"}
          nombreJuego={juegoNombre}
        />
      </div>

    </div>
  </div>
);


}
