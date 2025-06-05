import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const navigate = useNavigate();

  const steps = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  const nivelesSuperados = steps.map(
    (step) => sessionStorage.getItem(`nivel${step.id}Superado`) === "true"
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const superado = nivelesSuperados[step.id - 1];

          return (
            <div
              key={step.id}
              className="relative flex flex-col items-center flex-1"
              onClick={() => navigate(`/juego/selectores/nivel-${step.id}`)}
              title={`Ir al nivel ${step.id}`}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  superado
                    ? "border-green-500 bg-green-500 text-white"
                    : step.id === currentStep
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-gray-700 bg-gray-800 text-gray-400"
                }`}
              >
                {superado ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </div>

              <span
                className={`mt-2 text-sm font-medium text-center ${
                  superado || step.id === currentStep
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
              </span>

              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 right-[-50%] h-0.5 ${
                    nivelesSuperados[step.id - 1]
                      ? "bg-green-500"
                      : "bg-gray-700"
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
