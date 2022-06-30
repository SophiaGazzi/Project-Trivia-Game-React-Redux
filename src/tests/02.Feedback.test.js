import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import Feedback from '../pages/Feedback.jsx';
import { INITAL_STORE, INITAL_STORE_2 } from './Mocks/dataMock.js';
import App from '../App';

describe('Verifica a tela de feedback', () => {
    it('se tem os botões na tela, e tem 0 como score, mostrando "could be better"', () => {
        renderWithRouterAndRedux(<App />, INITAL_STORE , '/feedback')

        const nameEL = screen.getByTestId('header-player-name');
        const imgEL = screen.getByTestId('header-profile-picture');
        const scoreEL = screen.getByTestId('header-score');
        const feedbackEl = screen.getByTestId('feedback-text');

        expect(nameEL).toBeInTheDocument();
        expect(imgEL).toBeInTheDocument();
        expect(scoreEL).toBeInTheDocument();
        expect(feedbackEl).toHaveTextContent('Could be better...');

    })
    it('se tem um score maior que 3, verifica o texto Well Done!', () => {
        renderWithRouterAndRedux(<App />, INITAL_STORE_2 , '/feedback')

        const nameEL = screen.getByTestId('header-player-name');
        const imgEL = screen.getByTestId('header-profile-picture');
        const scoreEL = screen.getByTestId('header-score');
        const feedbackEl = screen.getByTestId('feedback-text');

        expect(nameEL).toBeInTheDocument();
        expect(imgEL).toBeInTheDocument();
        expect(scoreEL).toBeInTheDocument();
        expect(feedbackEl).toHaveTextContent('Well Done!');

    })
    it('se ao clicar no botão "Play" redireciona para a tela de Login', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE , '/feedback')

        const btnEl = screen.getByTestId('btn-play-again');
        userEvent.click(btnEl);

        expect(history.location.pathname).toBe('/');
    })

    it('se ao clicar no botão "Ranking" redireciona para a tela Ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE , '/feedback')

        const btnEl = screen.getByTestId('btn-ranking');

        userEvent.click(btnEl);
        expect(history.location.pathname).toBe('/ranking');
    });
})