import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWitchRouter';
import App from '../App';
import pokemon from '../data';

const ID_NAME = 'pokemon-name';
const ID_BUTTON = 'next-pokemon';
// peguei essa lógica no próprio código da aplicação
const TYPES_PK = [...new Set(pokemon.reduce((types, { type }) => [...types, type], []))];

describe('Testando o componente <Pokedex.js/>', () => {
  it('Testando se contém um h2 com o texto correto', () => {
    renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });
});

describe('Testando o funcionamento do botão "Próximo Pokémon"', () => {
  it('Testando se o botão contém o texto correto', () => {
    renderWithRouter(<App />);
    const buttonProxPok = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonProxPok).toBeInTheDocument();
  });
  it('Testando se aparece o próximo pokemon ao clickar no botão', () => {
    renderWithRouter(<App />);
    // Pegando o nome do pokemon que aparece na tela
    const prevPokemon = screen.getByTestId(ID_NAME).textContent;
    // clicando no botão e pegando o nome do pokemon que aparece na tela
    userEvent.click(screen.getByTestId(ID_BUTTON));
    const nextPokemon = screen.getByTestId(ID_NAME).textContent;
    // verificando se os nomes são diferentes
    expect(nextPokemon).not.toEqual(prevPokemon);
  });
  it('Testando se o primeiro Pokémon aparece após o último', () => {
    renderWithRouter(<App />);
    // Pegando o nome do primeiro pokemon e testando se é igual ao da lista
    const firstPokemon = screen.getByTestId(ID_NAME).textContent;
    expect(firstPokemon).toBe(pokemon[0].name);
    // Fazendo um loop para dar multiplos clicks
    for (let index = 0; index < pokemon.length - 1; index += 1) {
      userEvent.click(screen.getByTestId(ID_BUTTON));
    }
    // Pegando o nome do ultimo pokemon e testando se é igual ao da lista
    const lastPokemon = screen.getByTestId(ID_NAME).textContent;
    expect(lastPokemon).toBe(pokemon[(pokemon.length - 1)].name);
    // Testando se clickar mais uma vez no botão volta a mostrar o primeiro pokemon
    userEvent.click(screen.getByTestId(ID_BUTTON));
    const currentPokemon = screen.getByTestId(ID_NAME).textContent;
    expect(currentPokemon).toBe(firstPokemon);
  });
});
describe('Testa se é mostrado apenas um pokemon por vez', () => {
  it('Testando quantos nomes de pokemon aparece na tela por vez', () => {
    renderWithRouter(<App />);
    const quantilyCards = screen.getAllByTestId(ID_NAME);
    expect(quantilyCards.length).toBe(1);
  });
});
describe('Testando os botões de filtro', () => {
  test('Se tem um botão All e para cada tipo de Pokémon com o mesmo nome do tipo', () => {
    renderWithRouter(<App />);
    const allTypes = screen.getAllByTestId('pokemon-type-button');
    expect(allTypes.length).toBe(TYPES_PK.length);
    // TYPES_PK.forEach((type) => {
    //   expect(screen.getByRole('button', { name: type })).toBeDefined();
    //   expect(screen.getByRole('button', { name: /All/i })).toBeDefined();
    // });
  });
  test('Se ao clickar em um tipo, mostra apenas os pokemons daquele tipo', () => {
    renderWithRouter(<App />);
    TYPES_PK.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: type }));
      expect(screen.getByTestId('pokemon-type').textContent).toBe(type);
    });
  });
});
describe('Testando se contém um botão para resetar o filtro', () => {
  test('Se o texto do botão é "All"', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeVisible();
  });
  test('Se o filtro All está funcioando corretamente', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: /All/i }));
    pokemon.forEach((poke) => {
      expect(screen.getByTestId(ID_NAME).textContent).toBe(poke.name);
      userEvent.click(screen.getByTestId(ID_BUTTON));
    });
  });
  test('Se ao carregar a página, o All está selecionado', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByTestId(ID_BUTTON));
    const currentPokemon = screen.getByTestId(ID_NAME).textContent;
    expect(currentPokemon).toBe(pokemon[1].name);
  });
});
