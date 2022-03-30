import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWitchRouter';
import App from '../App';
import pokemon from '../data';

describe('Testando o componente <PokemonDetails.js/>', () => {
  it('Testando se as informações detalhadas do Pokemon estão na tela', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    const textHeading = `${pokemon[0].name} Details`;
    const headingDetails = screen.getByRole('heading', { name: textHeading });
    expect(headingDetails).toBeInTheDocument();

    expect(screen.queryByRole('link', { name: /More details/i })).not.toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(headingSummary).toBeInTheDocument();

    const paragraphSummary = screen.getByText(pokemon[0].summary);
    expect(paragraphSummary).toBeInTheDocument();
  });

  it('Testando se contém um mapa com as localizações dos pokémons', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    const text = `Game Locations of ${pokemon[0].name}`;
    expect(screen.getByRole('heading', { name: text, level: 2 })).toBeDefined();

    const altImgLocation = `${pokemon[0].name} location`;
    const imgsLocation = screen.getAllByAltText(altImgLocation);
    expect(imgsLocation.length).toBe(2);

    expect(imgsLocation[0].src).toBe(pokemon[0].foundAt[0].map);
    expect(imgsLocation[1].src).toBe(pokemon[0].foundAt[1].map);

    const textLocation1 = screen.getByText(pokemon[0].foundAt[0].location);
    const textLocation2 = screen.getByText(pokemon[0].foundAt[1].location);
    expect(textLocation1).toBeInTheDocument();
    expect(textLocation2).toBeInTheDocument();
  });

  it('Testando se é possível favoritar um Pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    const checkboxFavorite = screen.getByRole('checkbox', { id: /favorite/i });
    expect(checkboxFavorite).toBeInTheDocument();

    const altImgFavorite = `${pokemon[0].name} is marked as favorite`;
    const consultaImagens = screen.getAllByRole('img');
    expect(consultaImagens[1].alt).not.toBe(altImgFavorite);
    userEvent.click(checkboxFavorite);
    const newConsultaImagens = screen.getAllByRole('img');
    expect(newConsultaImagens[1].alt).toBe(altImgFavorite);
    userEvent.click(checkboxFavorite);
    const newNewConsultaImagens = screen.getAllByRole('img');
    expect(newNewConsultaImagens[1].alt).not.toBe(altImgFavorite);

    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
