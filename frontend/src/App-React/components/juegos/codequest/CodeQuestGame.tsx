'use client';

import { useState, useCallback } from 'react';
import ContenedorPreguntas from './preguntas/contenedor/contenedorPreguntas';
import { preguntasReact, preguntasJava, preguntasNet, preguntasGeneral, preguntasScrum } from './preguntas/preguntas';
import PersonajeAnimado from './personajes/personaje-animado';
import BarraDeVida from './personajes/barra_de_vida/Barra_de_vida';
import { mandarPuntuacion } from '../../../hooks/MandarPuntuacion';
import VinetaDialogo from './dialogos/vineta/vineta-dialogo';
import EmpezarJuego from './dialogos/modalInicio/empezarJuego';
import Comodin, { ComodinScrum, ComodinJefeMamon } from './preguntas/contenedor/contenedorComodines/comodin';
import Puertas from './escenarios/puertas/puertas';
import EscenarioScrum from './escenarios/scrum/EscenarioScrum';
import FrasesJugador from './personajes/frases/FrasesJugador';
import UsuarioMamon from './escenarios/usuario_mamon/Usuario_mamon';
import '../../../assets/juegos/codequest/styles/styles.css';

// Imágenes de jefes normales
import JefeReact from '../../../assets/juegos/codequest/personaje/jefe_react.png';
import JefeJava from '../../../assets/juegos/codequest/personaje/jefe_java.png';
import JefeNet from '../../../assets/juegos/codequest/personaje/jefe_net.png';
import JefeMamon from '../../../assets/juegos/codequest/personaje/jefe_usuario_cabron.png';
import JefeProgramador from '../../../assets/juegos/codequest/personaje/jefe_programador.png';
import JefeScrum from '../../../assets/juegos/codequest/personaje/jefe_scrum.png';

// Imágenes de jefes derrotados
import JefeReactDerrotado from '../../../assets/juegos/codequest/personaje/jefe_react_derrotado.png';
import JefeJavaDerrotado from '../../../assets/juegos/codequest/personaje/jefe_java_derrotado.png';
import JefeNetDerrotado from '../../../assets/juegos/codequest/personaje/jefe_net_derrotado.png';
import JefeMamonDerrotado from '../../../assets/juegos/codequest/personaje/jefe_usuario_cabron_derrotado.png';
import JefeProgramadorDerrotado from '../../../assets/juegos/codequest/personaje/jefe_programador_derrotado.png';
import JefeScrumDerrotado from '../../../assets/juegos/codequest/personaje/jefe_scrum_derrotado.png';

// Imágenes del jugador
import Jugador from '../../../assets/juegos/codequest/personaje/personaje_principal_back.png';
import JugadorSentado from '../../../assets/juegos/codequest/personaje/personaje_principal_sentado.png';
import JugadorDerrotado from '../../../assets/juegos/codequest/personaje/personaje_principal_derrotado.png';
import CampoBatalla from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_java.jpg';

//Imágenes de puertas
import PuertaCerrada from '../../../assets/juegos/codequest/imagenes/puerta_entrecerrada.png';
import PuertaAbierta from '../../../assets/juegos/codequest/imagenes/puerta_abierta.png';

// Campos de batalla
import JefeReactCampoBatalla from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_react.jpg';
import JefeJavaCampoBatalla from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_java.jpg';
import JefeNETCampoBatalla from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_jefeMamon.jpg';
import JefeMamonCampoBatalla from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_jefeMamon.jpg';
import JefeProgramadorCampoBatalla from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_jefeProgramador.jpg';
import JefeScrumCampoBatalla from '../../../assets/juegos/codequest/campoDeBatalla/campoBatalla_scrum.jpg';

type EstadoJuego =
  | 'seleccion-jefe'
  | 'dialogo-inicial'
  | 'pregunta'
  | 'respuesta'
  | 'victoria'
  | 'derrota'
  | 'puertas'
  | 'prueba-especial';
type TipoDialogo = 'jefe' | 'jugador' | null;
type TipoJefe = 'react' | 'java' | 'net' | 'mamon' | 'programador' | 'scrum';

interface JefeData {
  nombre: string;
  imagen: string;
  imagenDerrotado: string;
  fondo: string;
  preguntas: any[];
  vidaMaxima: number;
  fraseInicial: string;
  fraseVictoria: string;
  fraseDerrota: string;
}

export default function CodeQuest() {
  // Estado del juego
  const [estadoJuego, setEstadoJuego] = useState<EstadoJuego>('seleccion-jefe');
  const [tipoJefe, setTipoJefe] = useState<TipoJefe | null>(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [preguntasUsadas, setPreguntasUsadas] = useState<number[]>([]);
  const [vidaJugador, setVidaJugador] = useState(100);
  const [vidaJefe, setVidaJefe] = useState(0);
  const [dialogoActivo, setDialogoActivo] = useState<TipoDialogo>(null);
  const [animacionJefe, setAnimacionJefe] = useState<'idle' | 'attack' | 'damage'>('idle');
  const [animacionJugador, setAnimacionJugador] = useState<'idle' | 'attack' | 'damage'>('idle');
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<string | null>(null);
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [jefeDerrotado, setJefeDerrotado] = useState(false);
  const [puntuacionJugador, setPuntuacionJugador] = useState(0);
  const [jefesDerrrotados, setJefesDerrrotados] = useState<string[]>([]);
  const [dificultadActual, setDificultadActual] = useState<'facil' | 'media' | 'dificil' | null>(null);
  const [fallosConsecutivos, setFallosConsecutivos] = useState(0);
  const [comodinesActivos, setComodinesActivos] = useState(true);

  // Comodines
  const [comodin50porCiento, setComodin50PorCiento] = useState(true);
  const [comodinRecuperarVida, setComodinRecuperarVida] = useState(true);
  const [comodin50deDanyo, setComodin50DeDanyo] = useState(true);
  const [opcionesOcultas, setOpcionesOcultas] = useState<string[]>([]);

  // Comodines específicos para Scrum
  const [comodinScrumVida, setComodinScrumVida] = useState(true);
  const [comodinScrumRetro, setComodinScrumRetro] = useState(true);
  const [comodinScrumDaily, setComodinScrumDaily] = useState(true);

  // Comodines específicos para Jefe Mamon
  const [comodinMamonVida, setComodinMamonVida] = useState(true);
  const [comodinMamonChatGpt, setComodinMamonChatGpt] = useState(true);
  const [comodinMamonEscape, setComodinMamonEscape] = useState(true);

  // Estado para mostrar la viñeta del comodín Escapar
  const [mostrarVinetaComodinEscape, setMostrarVinetaComodinEscape] = useState(false);

  // Datos de los jefes
  const jefesData: Record<TipoJefe, JefeData> = {
    react: {
      nombre: 'JEFE REACT',
      imagen: JefeReact,
      imagenDerrotado: JefeReactDerrotado,
      fondo: JefeReactCampoBatalla,
      preguntas: preguntasReact,
      vidaMaxima: 150,
      fraseInicial:
        '¡Prepárate para enfrentar mis preguntas de React! Solo los verdaderos maestros del código pueden derrotarme.',
      fraseVictoria: '¡Imposible! ¿Cómo has podido dominar React mejor que yo?',
      fraseDerrota: '¡Ja! Como esperaba, aún te falta mucho por aprender sobre React.',
    },
    java: {
      nombre: 'JEFE JAVA',
      imagen: JefeJava,
      imagenDerrotado: JefeJavaDerrotado,
      fondo: JefeJavaCampoBatalla,
      preguntas: preguntasJava,
      vidaMaxima: 175,
      fraseInicial: '¡Java es el lenguaje supremo! Demuéstrame que conoces su poder orientado a objetos.',
      fraseVictoria: '¡No puede ser! Has dominado las complejidades de Java...',
      fraseDerrota: '¡Necesitas más café para entender Java! Vuelve cuando estés preparado.',
    },
    net: {
      nombre: 'JEFE .NET',
      imagen: JefeNet,
      imagenDerrotado: JefeNetDerrotado,
      fondo: JefeNETCampoBatalla,
      preguntas: preguntasNet,
      vidaMaxima: 160,
      fraseInicial: '¡El ecosistema .NET es invencible! Veamos si puedes resolver mis enigmas de C#.',
      fraseVictoria: '¡Microsoft estaría orgulloso de ti! Has superado mis desafíos.',
      fraseDerrota: 'Parece que necesitas actualizar tus conocimientos de .NET. ¡Inténtalo de nuevo!',
    },
    mamon: {
      nombre: 'USUARIO MAMÓN',
      imagen: JefeMamon,
      imagenDerrotado: JefeMamonDerrotado,
      fondo: JefeMamonCampoBatalla,
      preguntas: [...preguntasReact, ...preguntasJava, ...preguntasNet],
      vidaMaxima: 170,
      fraseInicial: '¡Tendré puestos mis ojos robóticos para poder ver donde encontrar fallos JAJAJA!',
      fraseVictoria: '¡Hmph! Supongo que no eres tan incompetente como pensaba...',
      fraseDerrota: '¡Lo sabía! Debería haber contratado a mi sobrino que sabe de ordenadores.',
    },
    programador: {
      nombre: 'JEFE PROGRAMADOR',
      imagen: JefeProgramador,
      imagenDerrotado: JefeProgramadorDerrotado,
      fondo: JefeProgramadorCampoBatalla,
      preguntas: preguntasGeneral,
      vidaMaxima: 200,
      fraseInicial:
        'He dominado todos los lenguajes de programación. ¡Veamos si puedes responder a mis preguntas fundamentales!',
      fraseVictoria: 'Tu conocimiento es impresionante. Quizás algún día llegues a mi nivel.',
      fraseDerrota: 'Aún te queda mucho por aprender, joven programador. Vuelve cuando hayas estudiado más.',
    },
    scrum: {
      nombre: 'JEFE SCRUM',
      imagen: JefeScrum,
      imagenDerrotado: JefeScrumDerrotado,
      fondo: JefeScrumCampoBatalla,
      preguntas: preguntasScrum,
      vidaMaxima: 150,
      fraseInicial: '¡Bienvenido a nuestro Daily Scrum! Veamos si entiendes los principios ágiles.',
      fraseVictoria: '¡Increíble! Has demostrado ser un verdadero Scrum Master.',
      fraseDerrota: 'Parece que necesitas más sprints de aprendizaje. ¡La retrospectiva no será agradable, prepárate!',
    },
  };

  // Obtener datos del jefe actual
  const jefeActual = tipoJefe ? jefesData[tipoJefe] : null;
  const preguntasActuales = jefeActual?.preguntas || [];

  const obtenerPreguntaNoUsada = () => {
    const preguntasDisponibles = preguntasActuales
      .map((_, index) => index)
      .filter((index) => !preguntasUsadas.includes(index));

    if (preguntasDisponibles.length === 0) {
      // Si se acabaron las preguntas, reiniciar el pool
      setPreguntasUsadas([]);
      return Math.floor(Math.random() * preguntasActuales.length);
    }

    const indiceAleatorio = Math.floor(Math.random() * preguntasDisponibles.length);
    return preguntasDisponibles[indiceAleatorio];
  };

  // Función para seleccionar jefe
  const seleccionarJefe = (jefe: string) => {
    const tipoJefeSeleccionado = jefe as TipoJefe;
    setTipoJefe(tipoJefeSeleccionado);
    setVidaJefe(jefesData[tipoJefeSeleccionado].vidaMaxima);
    if (tipoJefeSeleccionado === 'programador') {
      setEstadoJuego('puertas');
    } else if (tipoJefeSeleccionado === 'mamon') {
      setEstadoJuego('prueba-especial');
    } else {
      setEstadoJuego('dialogo-inicial');
    }
    setJefeDerrotado(false);
    setPreguntasUsadas([]);
    const primeraPregunta = Math.floor(Math.random() * jefesData[tipoJefeSeleccionado].preguntas.length);
    setPreguntaActual(primeraPregunta);
    setPreguntasUsadas([primeraPregunta]);
    setVidaJugador(vidaJugador);
    setRespuestaSeleccionada(null);
    setMensajeRespuesta('');
    setOpcionesOcultas([]);
    setComodin50PorCiento(true);
    setComodinRecuperarVida(true);
    setComodin50DeDanyo(true);
    // Reiniciar comodines de Scrum
    setComodinScrumVida(true);
    setComodinScrumRetro(true);
    setComodinScrumDaily(true);
    // Reiniciar comodines de Mamon
    setComodinMamonVida(true);
    setComodinMamonChatGpt(true);
    setComodinMamonEscape(true);
    setMostrarPregunta(false);
    setDificultadActual(null);
    setFallosConsecutivos(0);
    iniciarDialogoInicial();
    setComodinesActivos(true);

    if (tipoJefeSeleccionado !== 'mamon' && tipoJefeSeleccionado !== 'programador') {
      iniciarDialogoInicial();
    }
  };

  // Iniciar diálogo inicial
  const iniciarDialogoInicial = () => {
    setTimeout(() => {
      setDialogoActivo('jefe');
      setAnimacionJefe('attack');
    }, 500);
  };

  // Manejar la desaparición de diálogos
  const manejarDesaparicionDialogo = useCallback(() => {
    if (estadoJuego === 'dialogo-inicial' && dialogoActivo === 'jefe') {
      setDialogoActivo('jugador');
      setAnimacionJefe('idle');
      setAnimacionJugador('attack');
    } else if (estadoJuego === 'dialogo-inicial' && dialogoActivo === 'jugador') {
      setDialogoActivo(null);
      setAnimacionJugador('idle');
      setEstadoJuego('pregunta');

      // Mostrar pregunta después de un breve delay
      setTimeout(() => {
        setMostrarPregunta(true);
      }, 1000);
    } else if (estadoJuego === 'respuesta') {
      setDialogoActivo(null);
      setAnimacionJefe('idle');
      setAnimacionJugador('idle');

      // Pasar a la siguiente pregunta o finalizar el juego
      if (vidaJefe <= 0) {
        setJefeDerrotado(true);
        if (tipoJefe && !jefesDerrrotados.includes(tipoJefe)) {
          setJefesDerrrotados((prev) => [...prev, tipoJefe]);
        }
        setEstadoJuego('victoria');
        setDialogoActivo('jefe');
      } else if (vidaJugador <= 0) {
        setEstadoJuego('derrota');
        setDialogoActivo('jugador');
      } else {
        // Obtener siguiente pregunta no usada
        const siguientePregunta = obtenerPreguntaNoUsada();
        setPreguntaActual(siguientePregunta);
        setPreguntasUsadas((prev) => [...prev, siguientePregunta]);
        setPreguntaActual(siguientePregunta);
        setEstadoJuego('pregunta');
        setMostrarPregunta(true);
        setRespuestaSeleccionada(null);
        setOpcionesOcultas([]);
      }
    } else if (estadoJuego === 'victoria') {
      // Después del diálogo de victoria, mostrar selección de jefes
      setEstadoJuego('seleccion-jefe');
    } else {
      setDialogoActivo(null);
      setAnimacionJefe('idle');
      setAnimacionJugador('idle');
    }
  }, [
    estadoJuego,
    dialogoActivo,
    preguntaActual,
    preguntasActuales.length,
    vidaJefe,
    vidaJugador,
    tipoJefe,
    jefesDerrrotados,
    preguntasUsadas,
  ]);

  // Función para manejar la selección de respuesta
  const seleccionarRespuesta = (opcion: string) => {
    if (estadoJuego !== 'pregunta' || !jefeActual || respuestaSeleccionada !== null) return;

    setRespuestaSeleccionada(opcion);
    const preguntaActualData = preguntasActuales[preguntaActual];
    const esCorrecta = opcion === preguntaActualData.respuestaCorrecta;

    setEstadoJuego('respuesta');

    setTimeout(() => {
      if (esCorrecta) {
        // Respuesta correcta: daño al jefe

        let danyo = 25; // Daño base
        let puntos = 50; // Puntos base

        // Aplicar bonificaciones según dificultad (solo para jefe programador)
        if (tipoJefe === 'programador' && dificultadActual) {
          switch (dificultadActual) {
            case 'facil':
              danyo = 10;
              puntos = 20;
              break;
            case 'media':
              danyo = 25;
              puntos = 35;
              break;
            case 'dificil':
              danyo = 40;
              puntos = 50;
              break;
          }
        }

        setMensajeRespuesta('¡Respuesta correcta! Has infligido daño al jefe.');
        setDialogoActivo('jugador');
        setAnimacionJugador('attack');
        setPuntuacionJugador((prev) => prev + puntos);

        setTimeout(() => {
          setVidaJefe((prev) => Math.max(0, prev - danyo));
          setAnimacionJefe('damage');
        }, 1000);
      } else {
        // Respuesta incorrecta: daño al jugador
        const respuestaCompleta = preguntaActualData.opcionesRespuesta[preguntaActualData.respuestaCorrecta];
        setMensajeRespuesta(
          `¡Respuesta incorrecta! La respuesta correcta era: ${preguntaActualData.respuestaCorrecta.toUpperCase()} - ${respuestaCompleta}`
        );
        setDialogoActivo('jefe');
        setAnimacionJefe('attack');
        setFallosConsecutivos((prev) => prev + 1);

        setTimeout(() => {
          setVidaJugador((prev) => Math.max(0, prev - 20));
          setAnimacionJugador('damage');
        }, 1000);
      }
    }, 500);
  };

  // Función para manejar tiempo agotado
  const manejarTiempoAgotado = () => {
    if (estadoJuego === 'pregunta' && respuestaSeleccionada === null) {
      // Simular respuesta incorrecta cuando se agota el tiempo
      const preguntaActualData = preguntasActuales[preguntaActual];
      const respuestaCompleta = preguntaActualData.opcionesRespuesta[preguntaActualData.respuestaCorrecta];

      setRespuestaSeleccionada('timeout');
      setEstadoJuego('respuesta');
      setMensajeRespuesta(
        `¡Tiempo agotado! La respuesta correcta era: ${preguntaActualData.respuestaCorrecta.toUpperCase()} - ${respuestaCompleta}`
      );
      setDialogoActivo('jefe');
      setAnimacionJefe('attack');
      setFallosConsecutivos((prev) => prev + 1);

      setTimeout(() => {
        setVidaJugador((prev) => Math.max(0, prev - 20));
        setAnimacionJugador('damage');
      }, 1000);
    }
  };

  // Usar comodín 50%
  const usarComodin50PorCiento = () => {
    if (!comodin50porCiento || estadoJuego !== 'pregunta' || !jefeActual) return;

    setComodin50PorCiento(false);

    const preguntaActualData = preguntasActuales[preguntaActual];
    const respuestaCorrecta = preguntaActualData.respuestaCorrecta;
    const todasLasOpciones = Object.keys(preguntaActualData.opcionesRespuesta);
    const opcionesIncorrectas = todasLasOpciones.filter((opcion) => opcion !== respuestaCorrecta);

    const opcionesAOcultar = opcionesIncorrectas.sort(() => Math.random() - 0.5).slice(0, 2);
    setOpcionesOcultas(opcionesAOcultar);
  };

  // Usar comodín recuperar vida
  const usarComodinRecuperarVida = () => {
    if (!comodinRecuperarVida) return;

    setComodinRecuperarVida(false);
    setVidaJugador((prev) => Math.min(100, prev + 30));
  };

  // Usar comodín daño
  const usarComodinDanyo = () => {
    if (!comodin50deDanyo || !jefeActual) return;

    setComodin50DeDanyo(false);
    setVidaJefe((prev) => Math.max(0, prev - 30));
    setAnimacionJefe('damage');

    // Verificar si el jefe ha sido derrotado
    if (vidaJefe - 50 <= 0) {
      setTimeout(() => {
        setJefeDerrotado(true);
        if (tipoJefe && !jefesDerrrotados.includes(tipoJefe)) {
          setJefesDerrrotados((prev) => [...prev, tipoJefe]);
        }
        setEstadoJuego('victoria');
        setDialogoActivo('jefe');
      }, 1000);
      // Puntuacion por derrotar al jefe
      setPuntuacionJugador((prev) => prev + 400);
    }
  };

  // Comodines específicos para Scrum
  const usarComodinScrumVida = () => {
    if (!comodinScrumVida) return;
    setComodinScrumVida(false);
    setVidaJugador((prev) => Math.min(100, prev + 30));
  };

  const usarComodinScrumRetro = () => {
    if (!comodinScrumRetro || estadoJuego !== 'pregunta' || !jefeActual) return;

    setComodinScrumRetro(false);

    const preguntaActualData = preguntasActuales[preguntaActual];
    const respuestaCorrecta = preguntaActualData.respuestaCorrecta;
    const todasLasOpciones = Object.keys(preguntaActualData.opcionesRespuesta);
    const opcionesIncorrectas = todasLasOpciones.filter((opcion) => opcion !== respuestaCorrecta);

    const opcionesAOcultar = opcionesIncorrectas.sort(() => Math.random() - 0.5).slice(0, 2);
    setOpcionesOcultas(opcionesAOcultar);
  };

  const usarComodinScrumDaily = () => {
    if (!comodinScrumDaily || estadoJuego !== 'pregunta') return;

    setComodinScrumDaily(false);

    // Reiniciar la pregunta actual - limpiar respuesta seleccionada y opciones ocultas
    setRespuestaSeleccionada(null);
    setOpcionesOcultas([]);

    // Obtener una nueva pregunta no usada
    const nuevaPregunta = obtenerPreguntaNoUsada();
    setPreguntaActual(nuevaPregunta);
    setPreguntasUsadas((prev) => [...prev, nuevaPregunta]);
  };

  // Comodines específicos para Jefe Mamon
  const usarComodinMamonVida = () => {
    if (!comodinMamonVida) return;
    setComodinMamonVida(false);
    setVidaJugador((prev) => Math.min(100, prev + 30));
  };

  // Usar comodín ChatGpt
  const usarComodinMamonBuscarInternet = () => {
    if (!comodinMamonChatGpt || estadoJuego !== 'pregunta' || !jefeActual) return;

    setComodinMamonChatGpt(false);

    const preguntaActualData = preguntasActuales[preguntaActual];
    const respuestaCorrecta = preguntaActualData.respuestaCorrecta;
    const todasLasOpciones = Object.keys(preguntaActualData.opcionesRespuesta);
    const opcionesIncorrectas = todasLasOpciones.filter((opcion) => opcion !== respuestaCorrecta);

    const opcionesAOcultar = opcionesIncorrectas.sort(() => Math.random() - 0.5).slice(0, 3);
    setOpcionesOcultas(opcionesAOcultar);
  };

  // Usar comodín Escapar
  const usarComodinMamonEscapar = () => {
    if (!comodinMamonEscape) return;
    setMostrarVinetaComodinEscape(true);
  };

  // Callback cuando desaparece la viñeta del comodín Escapar
  const manejarDesaparicionVinetaComodinEscape = () => {
    setComodinMamonEscape(false);
    setMostrarVinetaComodinEscape(false);
    setTipoJefe(null);
    setEstadoJuego('seleccion-jefe');
  };

  // Manejar prueba completada del jefe mamón
  const manejarPruebaCompletada = (puntos: number) => {
    setPuntuacionJugador((prev) => prev + puntos);
    // Hacer daño al jefe
    setVidaJefe((prev) => Math.max(0, prev - 70));
    setAnimacionJefe('damage');

    setComodinesActivos(true);

    // Mostrar diálogo del jefe después del daño
    setTimeout(() => {
      setDialogoActivo('jefe');
      setMensajeRespuesta('¡Maldición! No esperaba que pudieras superar esa prueba... Pero esto no ha terminado.');
      setEstadoJuego('respuesta');
    }, 1000);
  };

  // Manejar prueba fallada del jefe mamón
  const manejarPruebaFallada = () => {
    setVidaJugador((prev) => Math.max(0, prev - 30));
    setAnimacionJugador('damage');
    setComodinesActivos(true);

    // Mostrar diálogo del jefe
    setTimeout(() => {
      setDialogoActivo('jefe');
      setMensajeRespuesta('¡Ja! Como esperaba, no tienes lo necesario para superar mis pruebas especiales.');
      setEstadoJuego('respuesta');
    }, 1000);
  };

  // Callback para cuando inicia el minijuego de memoria (desactivar comodines)
  const manejarInicioMinijuego = () => {
    setComodinesActivos(false);
  };

  // Callback para cuando termina el minijuego de memoria (reactivar comodines)
  const manejarFinMinijuego = () => {
    setComodinesActivos(true);
  };

  // Reiniciar juego
  const reiniciarJuegoCompleto = () => {
    setEstadoJuego('seleccion-jefe');
    setTipoJefe(null);
    setPreguntaActual(0);
    setPreguntasUsadas([]);
    setVidaJugador(100);
    setVidaJefe(0);
    setDialogoActivo(null);
    setAnimacionJefe('idle');
    setAnimacionJugador('idle');
    setMostrarPregunta(false);
    setRespuestaSeleccionada(null);
    setMensajeRespuesta('');
    setJefeDerrotado(false);
    setPuntuacionJugador(0);
    setJefesDerrrotados([]);
    setComodin50PorCiento(true);
    setComodinRecuperarVida(true);
    setComodin50DeDanyo(true);
    setComodinScrumVida(true);
    setComodinScrumRetro(true);
    setComodinScrumDaily(true);
    setComodinMamonVida(true);
    setComodinMamonChatGpt(true);
    setComodinMamonEscape(true);
    setOpcionesOcultas([]);
    setDificultadActual(null);
    setFallosConsecutivos(0);
    setComodinesActivos(true);
  };

  // Obtener el mensaje de diálogo según el estado
  const obtenerMensajeDialogo = () => {
    if (!jefeActual) return '';

    if (dialogoActivo === 'jefe') {
      if (estadoJuego === 'dialogo-inicial') return jefeActual.fraseInicial;
      if (estadoJuego === 'respuesta' && mensajeRespuesta) {
        return mensajeRespuesta;
      }
      if (estadoJuego === 'victoria') return jefeActual.fraseVictoria;
      if (estadoJuego === 'derrota') return jefeActual.fraseDerrota;
      return '¡Prepárate para mi siguiente prueba!';
    }

    if (dialogoActivo === 'jugador') {
      if (estadoJuego === 'dialogo-inicial') return '¡Acepto tu desafío! Deberia ser suficiente con lo que aprendí.';
      if (
        estadoJuego === 'respuesta' &&
        respuestaSeleccionada === jefeActual.preguntas[preguntaActual].respuestaCorrecta
      ) {
        return mensajeRespuesta;
      }
      if (estadoJuego === 'victoria') return '¡Lo logré! He demostrado que tengo más conocimiento que tú.';
      if (estadoJuego === 'derrota') return 'No ha salido como esperaba... pero volveré más preparado.';
      return '¡Creo que sé la respuesta!';
    }

    return '';
  };

  // Obtener el fondo según el jefe actual
  const obtenerFondo = () => {
    if (jefeActual) {
      return jefeActual.fondo;
    }
    return CampoBatalla;
  };
  // Función para manejar la selección de una puerta
  const manejarSeleccionPuerta = (dificultad: 'facil' | 'media' | 'dificil') => {
    // Asignar la pregunta seleccionada y dificultad
    setDificultadActual(dificultad);

    // Obtener una pregunta no usada
    const nuevaPregunta = obtenerPreguntaNoUsada();
    setPreguntaActual(nuevaPregunta);
    setPreguntasUsadas((prev) => [...prev, nuevaPregunta]);

    // Cambiar al estado de pregunta
    setEstadoJuego('pregunta');

    // Mostrar la pregunta después de un breve delay
    setTimeout(() => {
      setMostrarPregunta(true);
    }, 1000);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{
        backgroundImage: `url(${obtenerFondo()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Título del juego */}
      <h2
        className="tituloPrincipal font-bold text-center w-full text-purple-400 drop-shadow-md h-8 sm:h-10 md:h-14 text-2xl sm:text-4xl md:text-6xl lg:text-8xl"
        style={{ fontSize: '5rem' }}
      >
        CodeQuest
      </h2>

      {/* Contenedor principal del juego */}
      {tipoJefe && jefeActual && (
        <div className="flex-1 flex flex-col relative">
          {/* Barra de vida del jefe - arriba a la derecha */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-48 sm:w-64 md:w-80 lg:w-96 z-10">
            <BarraDeVida actual={vidaJefe} max={jefeActual.vidaMaxima} esJefe={jefeActual.nombre} />
          </div>

          {/* Jefe con posible viñeta de diálogo - arriba a la derecha */}
          <div className="absolute top-8 sm:top-12 md:top-16 right-2 sm:right-4 flex flex-col items-end mt-2 sm:mt-5">
            {dialogoActivo === 'jefe' && (
              <div className="mb-2 sm:mb-4 mr-8 sm:mr-16 z-20">
                <VinetaDialogo
                  texto={obtenerMensajeDialogo()}
                  posicion="derecha"
                  onDesaparecer={manejarDesaparicionDialogo}
                />
              </div>
            )}
            {/* Viñeta especial para el comodín Escapar */}
            {mostrarVinetaComodinEscape && (
              <div className="mb-2 sm:mb-4 mr-8 sm:mr-16 z-20">
                <VinetaDialogo
                  texto="Veo que te hiciste un poco de Pó Pó. ¡Eso es de primero de UI!"
                  posicion="derecha"
                  onDesaparecer={manejarDesaparicionVinetaComodinEscape}
                />
              </div>
            )}
            <PersonajeAnimado
              imagen={jefeDerrotado ? jefeActual.imagenDerrotado : jefeActual.imagen}
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96"
              animacion={animacionJefe}
            />
          </div>

          {/* Layout específico para Scrum */}
          {tipoJefe === 'scrum' && mostrarPregunta && estadoJuego === 'pregunta' && (
            <div className="flex flex-col lg:flex-row items-center justify-center px-2 sm:px-4">
              {/* Escenario Scrum  */}
              <div className="w-full lg:w-[30%] mb-4 lg:mb-0 lg:absolute lg:-top-4 flex items-center justify-center lg:justify-end">
                <EscenarioScrum fallosConsecutivos={fallosConsecutivos} preguntaActual={preguntaActual} />
              </div>

              {/* Preguntas */}
              <div className="flex w-full lg:absolute lg:bottom-1 justify-center">
                <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl">
                  <ContenedorPreguntas
                    pregunta={preguntasActuales[preguntaActual].pregunta}
                    codigo={preguntasActuales[preguntaActual].codigo}
                    opcionesRespuesta={preguntasActuales[preguntaActual].opcionesRespuesta}
                    respuestaCorrecta={preguntasActuales[preguntaActual].respuestaCorrecta}
                    onSeleccionarRespuesta={seleccionarRespuesta}
                    opcionesOcultas={opcionesOcultas}
                    respuestaSeleccionada={respuestaSeleccionada}
                    dificultad={dificultadActual}
                    onTiempoAgotado={manejarTiempoAgotado}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contenedor de Usuario_mamon */}

          {tipoJefe === 'mamon' && estadoJuego === 'prueba-especial' && (
            <UsuarioMamon
              onPruebaCompletada={manejarPruebaCompletada}
              onPruebaFallada={manejarPruebaFallada}
              onInicioMinijuego={manejarInicioMinijuego}
              onFinMinijuego={manejarFinMinijuego}
            />
          )}

          {/* Contenedor de preguntas - centro (para jefe mamón después de pruebas y otros jefes) */}
          {((tipoJefe === 'mamon' && mostrarPregunta && estadoJuego === 'pregunta') ||
            (tipoJefe !== 'scrum' && tipoJefe !== 'mamon' && mostrarPregunta && estadoJuego === 'pregunta')) &&
            preguntaActual < preguntasActuales.length && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl z-10 px-2 sm:px-4">
                <ContenedorPreguntas
                  pregunta={preguntasActuales[preguntaActual].pregunta}
                  codigo={preguntasActuales[preguntaActual].codigo}
                  opcionesRespuesta={preguntasActuales[preguntaActual].opcionesRespuesta}
                  respuestaCorrecta={preguntasActuales[preguntaActual].respuestaCorrecta}
                  onSeleccionarRespuesta={seleccionarRespuesta}
                  opcionesOcultas={opcionesOcultas}
                  respuestaSeleccionada={respuestaSeleccionada}
                  dificultad={dificultadActual}
                  onTiempoAgotado={manejarTiempoAgotado}
                />
              </div>
            )}
          {/* Contenedor de puertas - centro */}
          {estadoJuego === 'puertas' && tipoJefe === 'programador' && (
            <div className="absolute inset-0 flex items-center justify-center z-10 px-2 sm:px-4">
              <Puertas
                onSeleccionPuerta={manejarSeleccionPuerta}
                preguntas={preguntasActuales}
                imagenPuertaCerrada={PuertaCerrada}
                imagenPuertaAbierta={PuertaAbierta}
              />
            </div>
          )}

          {/* Personaje del jugador - abajo a la izquierda */}
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
            {dialogoActivo === 'jugador' && (
              <div className="mb-2 sm:mb-4 ml-8 sm:ml-16 z-20">
                <VinetaDialogo
                  texto={obtenerMensajeDialogo()}
                  posicion="izquierda"
                  onDesaparecer={manejarDesaparicionDialogo}
                />
              </div>
            )}
            {/* Frases personalizadas del jugador */}
            <FrasesJugador
              tipoJefe={tipoJefe}
              vidaJugador={vidaJugador}
              estadoJuego={estadoJuego}
              fallosConsecutivos={fallosConsecutivos}
            />
            {/* Mostrar solo una imagen del jugador según la vida */}
            {vidaJugador <= 0 ? (
              <PersonajeAnimado imagen={JugadorDerrotado} className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96" animacion={animacionJugador} />
            ) : vidaJugador <= 50 ? (
              <PersonajeAnimado imagen={JugadorSentado} className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96" animacion={animacionJugador} />
            ) : (
              <PersonajeAnimado imagen={Jugador} className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96" animacion={animacionJugador} />
            )}
            {/*Puntuación y barra de vida del jugador */}
            <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-32 sm:left-48 md:left-64 w-40 sm:w-60 md:w-80">
              <span className="textoTales text-sm sm:text-lg md:text-2xl font-bold text-white ps-2">Puntuación: {puntuacionJugador}</span>
            </div>
            <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-32 sm:left-48 md:left-64 w-40 sm:w-60 md:w-80">
              <BarraDeVida actual={vidaJugador} max={100} />
            </div>
          </div>

          {/* Comodines */}
          {comodinesActivos && (
          <div className="absolute top-12 sm:top-16 md:top-20 left-2 sm:left-4 z-20">
            {tipoJefe === 'scrum' ? (
              <ComodinScrum
                vida={comodinScrumVida}
                retro={comodinScrumRetro}
                daily={comodinScrumDaily}
                onRecuperarVida={usarComodinScrumVida}
                onRetro={usarComodinScrumRetro}
                onDaily={usarComodinScrumDaily}
              />
            ) : tipoJefe === 'mamon' ? (
              <ComodinJefeMamon
                vida={comodinMamonVida}
                buscarInternet={comodinMamonChatGpt}
                escapar={comodinMamonEscape}
                onRecuperarVida={usarComodinMamonVida}
                onBuscarInternet={usarComodinMamonBuscarInternet}
                onEscapar={usarComodinMamonEscapar}
              />
            ) : (
              <Comodin
                vida={comodinRecuperarVida}
                danyo={comodin50deDanyo}
                cincuentaPorCiento={comodin50porCiento}
                onRecuperarVida={usarComodinRecuperarVida}
                onDanyo={usarComodinDanyo}
                onCincuentaPorCiento={usarComodin50PorCiento}
              />
            )}
          </div>
          )}

          {/* Botón para reiniciar (solo visible en derrota) */}
          {estadoJuego === 'derrota' &&
            !dialogoActivo &&
            // Mandamos la puntuacion al backend
            (mandarPuntuacion('CodeQuest', puntuacionJugador),
            (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 px-4">
                <div className="text-center bg-white bg-opacity-80 rounded-2xl p-4 sm:p-6 shadow-xl max-w-xs sm:max-w-md">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 tituloFuenteSecundario bg-gradient-to-r from-purple-700 to-red-700 bg-clip-text text-transparent">
                    ¡Fuiste derrotado!
                  </h3>
                  <p className="text-gray-700 textoArcade text-lg sm:text-xl md:text-2xl">
                    No te rindas tan facilmente,
                    <br />
                    intentalo de nuevo.
                  </p>
                  <p className="text-gray my-3 sm:my-5 font-semibold text-sm sm:text-base">
                    Tu puntuación total ha sido de:
                    <span className="text-xl sm:text-2xl font-bold text-violet-700"> {puntuacionJugador}</span>
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        seleccionarJefe(tipoJefe!);
                        reiniciarJuegoCompleto();
                      }}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-tr from-purple-700 to-red-700 text-white font-bold rounded-lg shadow-lg transition-colors duration-1000 hover:from-red-800 hover:to-red-800 text-sm sm:text-base"
                    >
                      Reintentar
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Modal de selección de jefe */}
      {estadoJuego === 'seleccion-jefe' && (
        <EmpezarJuego
          onSeleccionarJefe={seleccionarJefe}
          jefesDerrotados={jefesDerrrotados}
          esSeleccionPostVictoria={jefesDerrrotados.length > 0}
        />
      )}
    </div>
  );
}
