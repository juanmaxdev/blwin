import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest';
import ModalDialogo from '../../../dialogos/modalDialogo/modalDialogo';

describe('ModalDialogo', () => {
  test('muestra el título y el texto, y cierra al hacer clic en el botón ✕', () => {
    const onClose = vi.fn()

    render(<ModalDialogo id="test-modal" titulo="Hola" texto="Esto es una prueba" onClose={onClose} />)

    expect(screen.getByText('Hola')).toBeInTheDocument()
    expect(screen.getByText('Esto es una prueba')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /cerrar diálogo/i }))
    expect(onClose).toHaveBeenCalled()
  })
})

describe('ModalDialogoIntro', () => {
  test('muestra el título, el texto y cierra correctamente', () => {
    const onClose = vi.fn()

    render(<ModalDialogo id="intro" titulo="Bienvenido" texto="Comenzamos" onClose={onClose} />)

    expect(screen.getByText('Bienvenido')).toBeInTheDocument()
    expect(screen.getByText('Comenzamos')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /cerrar diálogo/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
