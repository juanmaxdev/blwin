/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ModalTematica from './ModalTematica';

describe('ModalTematica', () => {
  it('no renderiza nada si `visible` es false', () => {
    render(<ModalTematica visible={false} tematica="Ciencia" />);
    expect(screen.queryByText(/¡Te ha tocado!/i)).not.toBeInTheDocument();
  });

  it('no renderiza nada si `tematica` es null', () => {
    render(<ModalTematica visible={true} tematica={null} />);
    expect(screen.queryByText(/¡Te ha tocado!/i)).not.toBeInTheDocument();
  });

  it('muestra el mensaje y la temática cuando `visible` es true y `tematica` tiene valor', () => {
    render(<ModalTematica visible={true} tematica="Historia" />);
    expect(screen.getByText('🎉 ¡Te ha tocado!')).toBeInTheDocument();
    expect(screen.getByText('Historia')).toBeInTheDocument();
  });

  it('aplica las clases de estilo esperadas al modal', () => {
    render(<ModalTematica visible={true} tematica="Arte" />);
    const modal = screen.getByText('Arte').parentElement?.parentElement;
    expect(modal).toHaveClass('fixed', 'inset-0', 'bg-black', 'bg-opacity-70');
  });
});
