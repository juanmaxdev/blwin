/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import RuletaTematicas from './RuletaTematicas';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe('RuletaTematicas', () => {
  it('llama a onSelect con la temática correcta', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: 'Cine' });
    const onSelect = vi.fn();

    render(<RuletaTematicas onSelect={onSelect} />);

    const button = screen.getByRole('button', { name: /girar ruleta/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith('Cine');
    }, { timeout: 5000 });
  });
});
