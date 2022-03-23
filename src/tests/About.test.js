import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWitchRouter';
import About from '../components/About';

describe('Testando o componente <About.js/>', () => {
  it('Testando se a página contém um h2 com o texto: About Pokédex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(titleAbout).toBeInTheDocument();
  });
  it('Testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const text1 = /This application simulates a Pokédex/i;
    const paragraphs1 = screen.getByText(text1);
    expect(paragraphs1).toBeDefined();

    const text2 = /One can filter Pokémons by type/i;
    const paragraphs2 = screen.getByText(text2);
    expect(paragraphs2).toBeDefined();
  });
  it('Testando se a imagem do Pokedex aparece na página', () => {
    renderWithRouter(<About />);
    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex.src).toBe(img);
  });
});
