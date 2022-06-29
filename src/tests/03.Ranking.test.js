import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { INITAL_STORE, INITIAL_RANKING } from './Mocks/dataMock.js';

const localStorageMock = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
      removeItem(key) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
  });

describe('Tela de Ranking', () => {

    beforeEach(() => localStorage.setItem('ranking', JSON.stringify(INITIAL_RANKING)));

    it('se tem os elementos', () => {
        renderWithRouterAndRedux(<App />, INITAL_STORE , '/ranking');
        const btnTelaI = screen.getByRole('button', {name: /Retornar à tela inicial/i});
        const tittleEL = screen.getByRole('heading', {name: /^Ranking$/i, level: 1});
        const imgPlayer = screen.getAllByRole('img');
        const scoreP = screen.getByTestId('player-score-0');
        const scoreP2 = screen.getByTestId('player-score-1');
        
        expect(tittleEL).toBeInTheDocument();
        expect(btnTelaI).toBeInTheDocument();
        expect(imgPlayer).toHaveLength(2);
        expect(scoreP).toBeInTheDocument();
        expect(scoreP2).toBeInTheDocument();
 
    });
    it('se ao clicar redireciona a pag "Login"', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE , '/ranking');

        const btnEl = screen.getByRole('button', {name: /Retornar à tela inicial/i});

        userEvent.click(btnEl);

        expect(history.location.pathname).toBe('/');
    })
})  
