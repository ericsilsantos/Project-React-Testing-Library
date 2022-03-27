import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWitchRouter';
import pokemon from '../data';

it('Teste se é renderizado o card corretamente', () => {
  renderWithRouter(<App />);
  const namePokemon = screen.getByTestId('pokemon-name');
  expect(namePokemon.textContent).toBe(pokemon[0].name);
  const typePokemon = screen.getByTestId('pokemon-type');
  expect(typePokemon.textContent).toBe(pokemon[0].type);

  const wieghtPokemon = screen.getByTestId('pokemon-weight').textContent;
  expect(wieghtPokemon.includes('Average weight')).toBe(true);
  const { value } = pokemon[0].averageWeight;
  expect(wieghtPokemon.includes(value)).toBe(true);
  const { measurementUnit } = pokemon[0].averageWeight;
  expect(wieghtPokemon.includes(measurementUnit)).toBe(true);

  const imgPokemon = screen.getByRole('img');
  expect(imgPokemon.src).toBe(pokemon[0].image);
  const altImgPokemon = `${pokemon[0].name} sprite`;
  expect(imgPokemon.alt).toBe(altImgPokemon);
});
it('Testa se o card contém um link para o detalhamento do pokémon', () => {
  renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', { name: /More details/i });
  expect(linkDetails.href.includes(`/pokemons/${pokemon[0].id}`)).toBe(true);
});
it('Testa se ao clickar no link, direciona para a página correta', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: /More details/i }));
  const nameHeading = `${pokemon[0].name} Details`;
  const titleDetails = screen.getByRole('heading', { name: nameHeading });
  expect(titleDetails).toBeInTheDocument();
});
it('Testa se a url do link está correta', () => {
  const { history } = renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: /More details/i }));
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pokemon[0].id}`);
});
it('Testa se exite o ícone de estrela nos Pokemons favoritos', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: /More details/i }));
  userEvent.click(screen.getByRole('checkbox', { id: /favorite/i }));
  userEvent.click(screen.getByRole('link', { name: /Home/i }));
  const iconFavorite = screen.getAllByRole('img');
  expect(iconFavorite[1]).toBeDefined();
  expect(iconFavorite[1].src.includes('/star-icon.svg')).toBe(true);
  const altIconFavorite = `${pokemon[0].name} is marked as favorite`;
  expect(iconFavorite[1].alt).toBe(altIconFavorite);
});
