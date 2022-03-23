import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWitchRouter';

describe('Testando o componente <App.js />', () => {
  it('Testando se a aplicação contém os links de navegação', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeDefined();

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeDefined();

    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkToFavorite).toBeDefined();
  });

  it('Testando se o link Home direciona para a URL /', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /Home/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testando se o link About direciona para a URL /about', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /About/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testando se o link Favorite direciona para a URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testando se uma URL desconhecida direciona para /notfound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urldesconhecida');

    const notFound = screen.getByRole('heading', { name: /not found/i, level: 2 });
    expect(notFound).toBeDefined();
  });
});
