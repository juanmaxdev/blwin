// Importa el ícono de "check" para mostrar niveles completados
import { CheckCircle } from "lucide-react";

// Hook de navegación de React Router para redirigir entre niveles
import { useNavigate } from "react-router-dom";

// Define la interfaz para las props del componente
interface ProgressBarProps {
  currentStep: number; // Número del nivel actual que se está jugando
}

// Componente que renderiza una barra de progreso de niveles con navegación
export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const navigate = useNavigate();

  // Arreglo de objetos que representan cada nivel del 1 al 9
  const steps = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];

  // Recorre los niveles y verifica si están marcados como superados en sessionStorage
  const nivelesSuperados = steps.map(
    (step) => sessionStorage.getItem(`nivel${step.id}Superado`) === "true"
  );

  return (
    // Contenedor principal centrado y con ancho máximo definido
    <div className="w-full max-w-3xl mx-auto">
      {/* Contenedor horizontal con elementos distribuidos */}
      <div className="flex items-center justify-between relative">
        {/* Itera sobre cada paso para renderizar el nodo de progreso */}
        {steps.map((step, index) => {
          const superado = nivelesSuperados[step.id - 1];

          return (
            // Cada paso es clickable y redirige al nivel correspondiente
            <div
              key={step.id}
              className="relative flex flex-col items-center flex-1"
              onClick={() => navigate(`/juego/selectores/nivel-${step.id}`)}
              title={`Ir al nivel ${step.id}`}
              style={{ cursor: "pointer" }}
            >
              {/* Nodo circular que representa cada nivel */}
              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  superado
                    ? "border-green-500 bg-green-500 text-white" // Si el nivel fue completado
                    : step.id === currentStep
                      ? "border-red-600 bg-red-600 text-white" // Si es el nivel actual
                      : "border-gray-700 bg-gray-800 text-gray-400" // Si no está completado ni activo
                }`}
              >
                {/* Si fue completado, muestra ícono, si no, muestra número */}
                {superado ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>

              {/* Espacio para texto debajo del nodo (actualmente vacío) */}
              <span
                className={`mt-2 text-sm font-medium text-center ${
                  superado || step.id === currentStep
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
              </span>

              {/* Línea horizontal que conecta con el siguiente nodo */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 right-[-50%] h-0.5 ${
                    nivelesSuperados[step.id - 1]
                      ? "bg-green-500" // Línea verde si el nivel fue superado
                      : "bg-gray-700" // Línea gris si no fue completado
                  }`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
