# Triviados

## Introducción
**Triviado** es una aplicación web en la que los jugadores pueden divertirse, aprender y competir con amigos o con otros usuarios, respondiendo preguntas de diversas temáticas populares, como deportes, historia, y, especialmente, una categoría destacada de ***INFORMÁTICA***.

Además, la aplicación contará con un sistema de puntuación que permitirá generar un ranking con los 5 mejores resultados.

## Objetivos
- **Crear una plataforma interactiva** que permita a los usuarios competir en tiempo real respondiendo preguntas.
- **Incluir preguntas de varias temáticas populares**, como deportes, historia, y una categoría especial sobre informática, para brindar un contenido diversificado.
- **Desarrollar un sistema de puntuación**, donde los jugadores puedan ganar puntos, en función de las preguntas acertadas y el número de errores, posicionándose en ranking global.
- **Implementar modo de juego que fomente la competencia sana** a través de tablas de clasificación.
- **Permitir la personalización de la experiencia (Opcional)**, como elegir categorías favoritas o ajustar el nivel de dificultad de las preguntas.

## Guía de Colaboración

¡Gracias por tu interés en colaborar en **Triviados**! Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. **Forkea el repositorio**: Realiza un fork del repositorio para tener tu propia copia y trabajar en tus cambios de forma independiente.
2. **Crea una rama de desarrollo local**: Antes de empezar a trabajar en nuevas funcionalidades o correcciones, crea una rama local derivada de la rama `develop`. Asegúrate de que tu rama esté actualizada con los últimos cambios de `develop`.
   - Ejemplo: `feature/agregar-nueva-categoria`
3. **Realiza tus cambios**: Trabaja en las modificaciones necesarias en tu rama local. Asegúrate de seguir las convenciones de código y buenas prácticas.
4. **Haz un commit**: Una vez que hayas terminado, realiza un commit con un mensaje claro y conciso que explique lo que has hecho.
   - Ejemplo de mensaje de commit: `Agrega preguntas de informática a la base de datos`
5. **Sube tu rama a tu repositorio remoto**: Empuja tu rama de cambios al repositorio remoto de tu fork.
6. **Solicita un Pull Request (PR)**: Luego de hacer el commit, envía un Pull Request desde tu rama local (derivada de `develop`) hacia la rama `release` del repositorio principal, con una descripción detallada de los cambios realizados.
7. **Revisión de código**: Los mantenedores del proyecto revisarán tu PR. Si todo está en orden, tu rama será fusionada a la rama `release`. Después de que los cambios hayan sido validados y testeados, se realizará un merge de `release` hacia la rama `main`.

### Flujo de trabajo con las ramas:
- **Rama `main`**: Es la rama estable que siempre contiene el código listo para producción.
- **Rama `release`**: Es una rama intermedia que contiene las funcionalidades nuevas y pruebas previas a su inclusión en `main`. Las nuevas características se fusionan aquí primero para realizar pruebas y validaciones.
- **Rama `develop`**: Es la rama donde se realiza el desarrollo diario. Cada desarrollador debe trabajar en ramas derivadas de `develop` (por ejemplo, `feature/xyz`), y luego fusionarlas de nuevo en `develop` cuando se completen.

### Normas de colaboración
- Utiliza el estilo de código consistente con el del proyecto.
- Si agregas nuevas características o funcionalidades, asegúrate de incluir pruebas automatizadas.
- Los mensajes de commit deben ser claros y descriptivos.
- Asegúrate de que todo el código esté bien documentado, con comentarios explicativos donde sea necesario.


¡Gracias por contribuir a **Triviados** y ayudarnos a crear una aplicación divertida y educativa para todos los jugadores!

## Objetivo principal ##
### Descripción de las principales funcionalidades ###

* #### Inicio de sesión y registro : Permite a los usuarios crear, actualizar y borrar su perfil. ####

* #### Sistema de juego: ####

    * #### Sistema de preguntas y respuestas: Preguntas de temáticas populares, con un enfoque especial en informática. #####

    * ##### Sistema de puntuación: Los jugadores ganan puntos en función de las respuestas correctas y el número de errores cometidos, lo que afecta su posición en el ranking global. #####

    * ##### Niveles de dificultad: (Opcional) Los jugadores pueden ajustar el nivel de dificultad de las preguntas. #####

* #### Modos de juego: ####

    * ##### Modo individual: Los jugadores pueden jugar de manera independiente.#####

    * ##### Modo multijugador: (Opcional) Permite competir contra otros jugadores en línea. #####

    * ##### Agregar amigos a la partida: (Opcional) Los jugadores pueden invitar amigos a participar en las partidas. #####

* #### Interacciones sociales: ####

    * ##### Los jugadores pueden tener una lista de amigos y ver su ranking comparado con ellos.#####

    * ##### Se mostrarán estadísticas de partidas pasadas, como la puntuación obtenida en cada una. #####

    * ##### Visualización de ranking total comparado con todos los jugadores. #####

    * Reglas de juego *Probando conflictos en GIT




## Reglas del juego

- **PUNTUACIÓN**:
    - **Tiempo máximo pregunta** : 30s.
    - **Puntuación pregunta**: 20 puntos (multiopción)/ 10 puntos (F/V)
    - Puntua la pregunta en función del tiempo en responder (opcional)
    


- **TIPO DE PREGUNTAS** : 
    - Aleatorias.
    - 3 preguntas/tipo consecutivas.
    - Dos tipos: 
        - Multiopción: 6 preguntas erróneas (muestra 3) / 1 correcta
        - Falso/Verdadero


- **PARTIDA** : 
    - Número de preguntas: 102 preguntas
    - Número máximo errores: 3


## Temáticas

- **HISTORIA**  -- Esther
- **INFORMÁTICA**  -- Carlos
- **DEPORTES**  --  Salvi
- **CIENCIA** --  Jesús
- **CINE**  -- Jesús
- **GEOGRAFÍA**  --  Carlos
- **ARTE**      -- Esther
- **MUSICA**  -- Salvi


Número de preguntas/temática: 50 preguntas (incluir respuestas erróneas).
