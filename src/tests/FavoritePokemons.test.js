import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWitchRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o componente <FavoritePokemons.js />', () => {
  test('É exibido a mensagem de "No favorite" se não tiver nenhum favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const textNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(textNotFound).toBeInTheDocument();
  });
  test('', () => {
    renderWithRouter(<App />);
    // Favoritar o primeiro pokemon
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByRole('checkbox'));
    // Favoritar o segundo pokemon
    userEvent.click(screen.getByRole('link', { name: /Home/i }));
    userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByRole('checkbox'));
    // Testa a quantidade de pokemóns em Favorite Pokémons
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons.length).toEqual(2);
  });
});
