"use client"

import ImagenPortada from '../../../../../assets/juegos/codequest/imagenes/codeQuest.png'

interface ModalDialogoProps {
  id: string
  titulo: string
  texto: string
  onClose?: () => void
}

export default function ModalDialogo({ id, titulo, texto, onClose }: ModalDialogoProps) {
  const handleButtonClick = () => {
    if (onClose) {
      onClose()
    }
  }
  return (
    <div id={id} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl max-w-md w-full mx-4 p-6 relative">
        <div className="absolute -top-4 left-8 w-0 h-0 border-t-8 border-t-white border-x-8 border-x-transparent" />

        <h2 className="text-2xl font-bold text-gray-800 mb-3">{titulo}</h2>

        <p className="text-gray-700 whitespace-pre-wrap">{texto}</p>

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar diálogo"
          onClick={() => {
            handleButtonClick()
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export function ModalDialogoIntro({ id, titulo, texto, onClose }: ModalDialogoProps) {
  const handleButtonClick = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div id={id} className="fixed inset-0 flex justify-center items-end sm:mb-14 sm:items-end lg:items-end xl:items-center xl:mt-40 mt-20 z-30 sm:z-40">
      <div className="bg-gradient-to-br from-white via-purple-100 to-blue-100 bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-8 relative border border-purple-200">
        {/* Decoración superior */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <img src={ImagenPortada} alt="CodeQuest Logo" className="w-20 h-20" />
          </div>
        </div>

        {/* Efectos decorativos */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
        <div
          className="absolute top-8 right-8 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-6 left-6 w-2 h-2 bg-purple-300 rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="mt-4">
          <h2 className="tituloFuente text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 text-center">
            {titulo}
          </h2>

          <div className="bg-white bg-opacity-50 rounded-xl p-4 mb-6 border border-purple-100">
            <p className="textoFuente text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{texto}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 flex items-center">
              <span className="animate-bounce mr-2">🙌</span>
              Animate a aprender a programar con CodeQuest
            </div>

            <button
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110 transform"
              aria-label="Cerrar diálogo"
              onClick={handleButtonClick}
              title="Cerrar (o espera a que termine automáticamente)"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
