import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWitchRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound.js/>', () => {
  it('Testando se a página contém o h2 com o texto correto', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole(
      'heading', { name: /Page requested not found/i, level: 2 },
    );
    expect(heading).toBeDefined();
  });
  it('Testando se a página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const imgSRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagens = screen.getAllByRole('img');
    expect(imagens[1].src).toBe(imgSRC);
  });
});
