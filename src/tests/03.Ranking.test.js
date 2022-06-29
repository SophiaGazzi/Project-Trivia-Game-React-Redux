import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { INITAL_STORE } from './Mocks/dataMock.js';

describe('Tela de Ranking', () => {
    it('se tem os elementos', () => {
        renderWithRouterAndRedux(<App />, INITAL_STORE , '/ranking')
        const btnTelaI = screen.getAllByRole('button', {name: /Retornar à tela inicial/i});
        const tittleEL = screen.getByRole('heading', {name: /^Ranking$/i, level: 1});
        const imgPlayer = screen.getByRole('img');
        const scoreP = screen.getById('player-score-');
        
        expect(tittleEL).toBeInTheDocument();
        expect(btnTelaI).toBeInTheDocument();
        expect(imgPlayer).toBeInTheDocument();
        expect(scoreP).toBeInTheDocument();
 
    });
    it('se ao clicar redireciona a pag "Login"', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE , '/ranking');

        const btnEl = screen.getAllByRole('button', {name: /Retornar à tela inicial/i});

        userEvent.click(btnEl);

        expect(history.location.pathname).toBe('/');
    })
})  
