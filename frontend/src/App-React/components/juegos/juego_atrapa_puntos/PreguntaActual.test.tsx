import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PreguntaActual from './PreguntaActual';
import { Pregunta } from './JuegoAtrapaPuntos';

// Pregunta de ejemplo
const preguntaMock: Pregunta = {
    pregunta: '¿Qué hace el operador "===" en JavaScript?',
    opciones: ['Compara solo el valor', 'Asigna un valor', 'Compara valor y tipo', 'Convierte una variable a string'],
    respuesta_correcta: 2,
};

// Apuestas simuladas con los puntos que tienes 
const apuestasMock = [0, 0, 10, 0];

// Función reutilizable para renderizar el componente en distintos estados
const setup = (respondido: boolean, ultimaRespuestaCorrecta: boolean | null = null) => {
    const cambiarApuesta = vi.fn(); // mock de la función para cambiar apuestas
    const enviarRespuesta = vi.fn(); // mock del envío de respuesta
    const siguientePregunta = vi.fn(); // mock para pasar a la siguiente pregunta

    render(
        <PreguntaActual
            pregunta={preguntaMock}
            apuestas={apuestasMock}
            puntos={20}
            respondido={respondido}
            cambiarApuesta={cambiarApuesta}
            enviarRespuesta={enviarRespuesta}
            ultimaRespuestaCorrecta={ultimaRespuestaCorrecta}
            siguientePregunta={siguientePregunta}
        />
    );

    return { cambiarApuesta, enviarRespuesta, siguientePregunta };
};

describe('PreguntaActual', () => {
    describe('PreguntaActual', () => {

        it('muestra la pregunta y opciones cuando no se ha respondido', () => {
            //False porque no se han enviado la respuesta
            setup(false);
            // Verifica que el texto de la pregunta se muestre en pantalla
            expect(screen.getByText(preguntaMock.pregunta)).toBeInTheDocument();
            //Verifica que se renderice 
            preguntaMock.opciones.forEach((opcion) => {
                expect(screen.getByText(opcion)).toBeInTheDocument();

            });
            //Comprueba que el boton este visible
            expect(screen.getByRole('button', { name: /enviar respuesta/i })).toBeInTheDocument();
        });

        it('llama a enviarRespuesta al hacer clic en el botón', () => {
            // Renderiza el componente con la función `enviarRespuesta` mockeada
            const { enviarRespuesta } = setup(false);
            //Obtiene el elemento de boton
            const boton = screen.getByRole('button', { name: /enviar respuesta/i });
            //Le da click al boton
            fireEvent.click(boton);
            // Verifica que la función se haya llamado exactamente una vez
            expect(enviarRespuesta).toHaveBeenCalledTimes(1);
        });

        it('muestra el resultado cuando respondido es true', () => {
            // Renderiza el componente en estado "respondido", con respuesta correcta
            setup(true, true);
            // Verifica que se muestra el mensaje de acierto
            expect(screen.getByText(/¡Correcto!/i)).toBeInTheDocument();
            // Verifica que se muestre el botón "Siguiente pregunta"
            expect(screen.getByRole('button', { name: /siguiente pregunta/i })).toBeInTheDocument();
        });
    });
});
