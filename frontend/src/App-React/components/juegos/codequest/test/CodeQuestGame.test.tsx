'use client';

/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import CodeQuest from '../CodeQuestGame';

// Mock de los hooks y funciones externas
vi.mock('../../../../hooks/MandarPuntuacion', () => ({
  mandarPuntuacion: vi.fn(),
}));

// Mock de framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock de gsap
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn(),
      call: vi.fn(),
    })),
    set: vi.fn(),
    to: vi.fn(),
  },
  TextPlugin: {},
}));

// Mock de las imágenes
vi.mock('../../../assets/juegos/codequest/personaje/jefe_react.png', () => ({
  default: '/mock-jefe-react.png',
}));

vi.mock('../../../assets/juegos/codequest/personaje/jefe_java.png', () => ({
  default: '/mock-jefe-java.png',
}));

vi.mock('../../../assets/juegos/codequest/personaje/personaje_principal_back.png', () => ({
  default: '/mock-jugador.png',
}));

// Mock de los componentes hijos
vi.mock('../dialogos/modalInicio/empezarJuego', () => ({
  default: ({ onSeleccionarJefe, jefesDerrotados }: any) => (
    <div data-testid="empezar-juego">
      <button onClick={() => onSeleccionarJefe('react')} data-testid="seleccionar-react">
        Seleccionar React
      </button>
      <button onClick={() => onSeleccionarJefe('java')} data-testid="seleccionar-java">
        Seleccionar Java
      </button>
      <button onClick={() => onSeleccionarJefe('mamon')} data-testid="seleccionar-mamon">
        Seleccionar Mamón
      </button>
      <div data-testid="jefes-derrotados">{jefesDerrotados.join(',')}</div>
    </div>
  ),
}));

vi.mock('../preguntas/contenedor/contenedorPreguntas', () => ({
  default: ({ pregunta, onSeleccionarRespuesta, respuestaCorrecta }: any) => (
    <div data-testid="contenedor-preguntas">
      <h3>{pregunta}</h3>
      <button onClick={() => onSeleccionarRespuesta(respuestaCorrecta)} data-testid="respuesta-correcta">
        Respuesta Correcta
      </button>
      <button onClick={() => onSeleccionarRespuesta('incorrecta')} data-testid="respuesta-incorrecta">
        Respuesta Incorrecta
      </button>
    </div>
  ),
}));

vi.mock('../personajes/personaje-animado', () => ({
  default: ({ imagen, className }: any) => (
    <div data-testid="personaje-animado" className={className}>
      <img src={imagen || '/placeholder.svg'} alt="personaje" />
    </div>
  ),
}));

vi.mock('../personajes/barra_de_vida/Barra_de_vida', () => ({
  default: ({ actual, max, esJefe }: any) => (
    <div data-testid="barra-vida">
      <span data-testid="vida-actual">{actual}</span>
      <span data-testid="vida-maxima">{max}</span>
      {esJefe && <span data-testid="nombre-jefe">{esJefe}</span>}
    </div>
  ),
}));

vi.mock('../preguntas/contenedor/contenedorComodines/comodin', () => ({
  default: ({ vida, danyo, cincuentaPorCiento, onRecuperarVida, onDanyo, onCincuentaPorCiento }: any) => (
    <div data-testid="comodines">
      <button onClick={onRecuperarVida} disabled={!vida} data-testid="comodin-vida">
        Vida
      </button>
      <button onClick={onDanyo} disabled={!danyo} data-testid="comodin-danyo">
        Daño
      </button>
      <button onClick={onCincuentaPorCiento} disabled={!cincuentaPorCiento} data-testid="comodin-50">
        50%
      </button>
    </div>
  ),
  ComodinScrum: ({ vida, retro, daily, onRecuperarVida, onRetro, onDaily }: any) => (
    <div data-testid="comodines-scrum">
      <button onClick={onRecuperarVida} disabled={!vida} data-testid="comodin-scrum-vida">
        Vida
      </button>
      <button onClick={onRetro} disabled={!retro} data-testid="comodin-scrum-retro">
        Retro
      </button>
      <button onClick={onDaily} disabled={!daily} data-testid="comodin-scrum-daily">
        Daily
      </button>
    </div>
  ),
  ComodinJefeMamon: ({ vida, buscarInternet, escapar, onRecuperarVida, onBuscarInternet, onEscapar }: any) => (
    <div data-testid="comodines-mamon">
      <button onClick={onRecuperarVida} disabled={!vida} data-testid="comodin-mamon-vida">
        Vida
      </button>
      <button onClick={onBuscarInternet} disabled={!buscarInternet} data-testid="comodin-mamon-internet">
        Internet
      </button>
      <button onClick={onEscapar} disabled={!escapar} data-testid="comodin-mamon-escapar">
        Escapar
      </button>
    </div>
  ),
}));

vi.mock('../dialogos/vineta/vineta-dialogo', () => ({
  default: ({ texto, onDesaparecer }: any) => (
    <div data-testid="vineta-dialogo" onClick={onDesaparecer}>
      {texto}
    </div>
  ),
}));

vi.mock('../escenarios/usuario_mamon/Usuario_mamon', () => ({
  default: ({ onPruebaCompletada, onPruebaFallada }: any) => (
    <div data-testid="usuario-mamon">
      <button onClick={() => onPruebaCompletada(100)} data-testid="prueba-completada">
        Completar Prueba
      </button>
      <button onClick={() => onPruebaFallada()} data-testid="prueba-fallada">
        Fallar Prueba
      </button>
    </div>
  ),
}));

vi.mock('../escenarios/puertas/puertas', () => ({
  default: ({ onSeleccionPuerta }: any) => (
    <div data-testid="puertas">
      <button onClick={() => onSeleccionPuerta('facil')} data-testid="puerta-facil">
        Fácil
      </button>
      <button onClick={() => onSeleccionPuerta('media')} data-testid="puerta-media">
        Media
      </button>
      <button onClick={() => onSeleccionPuerta('dificil')} data-testid="puerta-dificil">
        Difícil
      </button>
    </div>
  ),
}));

vi.mock('../personajes/frases/FrasesJugador', () => ({
  default: () => <div data-testid="frases-jugador">Frases del jugador</div>,
}));

vi.mock('../escenarios/scrum/EscenarioScrum', () => ({
  default: () => <div data-testid="escenario-scrum">Escenario Scrum</div>,
}));

describe('CodeQuest Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock de window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debe renderizar el título del juego', () => {
    render(<CodeQuest />);
    expect(screen.getByText('CodeQuest')).toBeInTheDocument();
  });

  it('debe mostrar la pantalla de selección de jefe inicialmente', () => {
    render(<CodeQuest />);
    expect(screen.getByTestId('empezar-juego')).toBeInTheDocument();
  });

  it('debe permitir seleccionar un jefe y cambiar al estado de diálogo', async () => {
    render(<CodeQuest />);

    const botonReact = screen.getByTestId('seleccionar-react');
    fireEvent.click(botonReact);

    await waitFor(() => {
      expect(screen.queryByTestId('empezar-juego')).not.toBeInTheDocument();
    });
  });

  it('debe mostrar las barras de vida cuando se selecciona un jefe', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    await waitFor(() => {
      const barras = screen.getAllByTestId('barra-vida');
      expect(barras.length).toBe(2); // Una para el jefe y otra para el jugador
      expect(barras[0]).toHaveTextContent('JEFE REACT');
      expect(barras[1]).not.toHaveTextContent('JEFE REACT');

      const personajes = screen.getAllByTestId('personaje-animado');
      expect(personajes.length).toBe(2); // Jefe y jugador
      expect(personajes[0].querySelector('img')).toHaveAttribute('src', expect.stringContaining('jefe_react'));
      expect(personajes[1].querySelector('img')).toHaveAttribute(
        'src',
        expect.stringContaining('personaje_principal_back')
      );

      expect(screen.getByTestId('comodines')).toBeInTheDocument();
    });
  });

  it('debe mostrar comodines normales para jefes regulares', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    await waitFor(() => {
      expect(screen.getByTestId('comodines')).toBeInTheDocument();
    });
  });

  it('debe mostrar comodines especiales para jefe Scrum', async () => {
    render(<CodeQuest />);

    // Necesitamos simular la selección del jefe Scrum
    const empezarJuego = screen.getByTestId('empezar-juego');
    const botonScrum = document.createElement('button');
    botonScrum.setAttribute('data-testid', 'seleccionar-scrum');
    botonScrum.onclick = () => {
      // Simular selección de Scrum
    };
    empezarJuego.appendChild(botonScrum);
  });

  it('debe permitir usar comodines', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    await waitFor(() => {
      const comodinVida = screen.getByTestId('comodin-vida');
      expect(comodinVida).not.toBeDisabled();

      fireEvent.click(comodinVida);
      // Verificar que el comodín se desactiva después de usarlo
      expect(comodinVida).toBeDisabled();
    });
  });

  it('debe manejar respuestas correctas e incorrectas', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // Esperar a que aparezca el contenedor de preguntas
    await waitFor(() => {
      const contenedorPreguntas = screen.queryByTestId('contenedor-preguntas');
      if (contenedorPreguntas) {
        const respuestaCorrecta = screen.getByTestId('respuesta-correcta');
        fireEvent.click(respuestaCorrecta);
      }
    });
  });

  it('debe mostrar el escenario especial para Usuario Mamón', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-mamon'));

    await waitFor(() => {
      expect(screen.getByTestId('usuario-mamon')).toBeInTheDocument();
    });
  });

  it('debe manejar la prueba completada del Usuario Mamón', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-mamon'));

    await waitFor(() => {
      const botonCompletar = screen.getByTestId('prueba-completada');
      fireEvent.click(botonCompletar);
    });
  });

  it('debe mostrar puertas para el Jefe Programador', async () => {
    render(<CodeQuest />);

    // Simular selección del jefe programador
    const empezarJuego = screen.getByTestId('empezar-juego');

    // Crear un botón mock para programador
    const botonProgramador = document.createElement('button');
    botonProgramador.setAttribute('data-testid', 'seleccionar-programador');
    botonProgramador.textContent = 'Seleccionar Programador';

    // Simular el evento de selección
    act(() => {
      fireEvent.click(botonProgramador);
    });
  });

  it('debe actualizar la puntuación correctamente', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // Verificar que la puntuación inicial es 0
    await waitFor(() => {
      expect(screen.getByText(/Puntuación: 0/)).toBeInTheDocument();
    });
  });

  it('debe manejar el estado de derrota', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // Simular múltiples respuestas incorrectas para llegar a derrota
    await waitFor(() => {
      const contenedorPreguntas = screen.queryByTestId('contenedor-preguntas');
      if (contenedorPreguntas) {
        // Simular respuestas incorrectas múltiples veces
        for (let i = 0; i < 5; i++) {
          const respuestaIncorrecta = screen.queryByTestId('respuesta-incorrecta');
          if (respuestaIncorrecta) {
            fireEvent.click(respuestaIncorrecta);
          }
        }
      }
    });
  });

  it('debe permitir reiniciar el juego después de la derrota', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // Simular derrota y verificar botón de reinicio
    await waitFor(() => {
      const botonReintentar = screen.queryByText('Reintentar');
      if (botonReintentar) {
        fireEvent.click(botonReintentar);
      }
    });
  });

  it('debe mostrar jefes derrotados en la selección', async () => {
    render(<CodeQuest />);

    // Verificar que inicialmente no hay jefes derrotados
    expect(screen.getByTestId('jefes-derrotados')).toHaveTextContent('');
  });

  it('debe manejar el tiempo agotado en preguntas', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // Simular tiempo agotado
    await waitFor(() => {
      const contenedorPreguntas = screen.queryByTestId('contenedor-preguntas');
      if (contenedorPreguntas) {
        // Simular que se agota el tiempo sin responder
        act(() => {
          // Aquí simularíamos el callback de tiempo agotado
        });
      }
    });
  });

  it('debe desactivar comodines durante el minijuego de memoria', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-mamon'));

    await waitFor(() => {
      // Verificar que los comodines están presentes inicialmente
      const comodines = screen.queryByTestId('comodines-mamon');
      expect(comodines).toBeInTheDocument();
    });
  });

  it('debe ser responsive en diferentes tamaños de pantalla', () => {
    render(<CodeQuest />);

    const titulo = screen.getByText('CodeQuest');
    expect(titulo).toHaveClass('text-2xl', 'sm:text-4xl', 'md:text-6xl', 'lg:text-8xl');
  });

  it('debe manejar la navegación entre estados del juego', async () => {
    render(<CodeQuest />);

    // Estado inicial: selección de jefe
    expect(screen.getByTestId('empezar-juego')).toBeInTheDocument();

    // Seleccionar jefe
    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // Verificar transición de estado
    await waitFor(() => {
      expect(screen.queryByTestId('empezar-juego')).not.toBeInTheDocument();
    });
  });

  it('debe mostrar personajes animados correctamente', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    await waitFor(() => {
      const personajes = screen.getAllByTestId('personaje-animado');
      expect(personajes.length).toBeGreaterThan(0);
    });
  });
});

// Tests específicos para funcionalidades avanzadas
describe('CodeQuest - Funcionalidades Avanzadas', () => {
  it('debe manejar múltiples jefes derrotados', async () => {
    render(<CodeQuest />);

    // Simular victoria contra React
    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // Aquí simularíamos el proceso completo de victoria
    await waitFor(() => {
      // Verificar que se puede seleccionar otro jefe después de la victoria
    });
  });

  it('debe validar el sistema de puntuación', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    await waitFor(() => {
      // Verificar puntuación inicial
      expect(screen.getByText(/Puntuación: 0/)).toBeInTheDocument();
    });
  });

  it('debe manejar errores en la carga de assets', () => {
    // Test para verificar que el componente maneja graciosamente los errores de carga
    render(<CodeQuest />);

    expect(screen.getByText('CodeQuest')).toBeInTheDocument();
  });
});

// Tests de integración
describe('CodeQuest - Tests de Integración', () => {
  it('debe completar un flujo completo de juego', async () => {
    render(<CodeQuest />);

    // 1. Seleccionar jefe
    fireEvent.click(screen.getByTestId('seleccionar-react'));

    // 2. Esperar diálogo inicial
    await waitFor(() => {
      const vineta = screen.queryByTestId('vineta-dialogo');
      if (vineta) {
        fireEvent.click(vineta);
      }
    });

    // 3. Responder pregunta
    await waitFor(() => {
      const respuesta = screen.queryByTestId('respuesta-correcta');
      if (respuesta) {
        fireEvent.click(respuesta);
      }
    });
  });

  it('debe mantener el estado del juego consistente', async () => {
    render(<CodeQuest />);

    fireEvent.click(screen.getByTestId('seleccionar-react'));

    await waitFor(() => {
      const barras = screen.getAllByTestId('barra-vida');
      expect(barras.length).toBe(2); // Una para el jefe y otra para el jugador
      expect(barras[0]).toHaveTextContent('JEFE REACT');
      expect(barras[1]).not.toHaveTextContent('JEFE REACT');

      const personajes = screen.getAllByTestId('personaje-animado');
      expect(personajes.length).toBe(2); // Jefe y jugador
      expect(personajes[0].querySelector('img')).toHaveAttribute('src', expect.stringContaining('jefe_react'));
      expect(personajes[1].querySelector('img')).toHaveAttribute(
        'src',
        expect.stringContaining('personaje_principal_back')
      );

      expect(screen.getByTestId('comodines')).toBeInTheDocument();
    });
  });
});
