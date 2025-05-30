/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import FormInput from './FormInput';

describe('FormInput', () => {
  it('se renderiza correctamente', () => {
    render(<FormInput value="" onChange={() => { }} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('muestra el valor correctamente', () => {
    render(<FormInput value="React" onChange={() => { }} />);
    const input = screen.getByDisplayValue('React');
    expect(input).toBeInTheDocument();
  });

  it('ejecuta onChange al cambiar el valor', () => {
    const handleChange = vi.fn();
    render(<FormInput value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nuevo valor' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('acepta placeholder como prop', () => {
    render(<FormInput value="" onChange={() => { }} placeholder="Tu nombre" />);
    const input = screen.getByPlaceholderText('Tu nombre');
    expect(input).toBeInTheDocument();
  });

  it('acepta el atributo disabled', () => {
    render(<FormInput value="" onChange={() => { }} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('acepta el atributo type', () => {
    render(<FormInput value="123" onChange={() => { }} type="number" />);
    const input = screen.getByDisplayValue('123');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('tiene las clases de estilo esperadas', () => {
    render(<FormInput value="" onChange={() => { }} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('px-4');
    expect(input).toHaveClass('py-3');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-gray-300');
    expect(input).toHaveClass('rounded-lg');
    expect(input).toHaveClass('focus:outline-none');
    expect(input).toHaveClass('focus:ring-2');
    expect(input).toHaveClass('focus:ring-indigo-500');
  });
});
