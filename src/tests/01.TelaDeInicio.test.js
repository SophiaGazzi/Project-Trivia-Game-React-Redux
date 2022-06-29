import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';

describe ('tela de Login', () => {
    it('se tem um botão de input nome', () => {
        renderWithRouterAndRedux(<Login />);
        const USER_NAME = 'User Teste';

        const nomeEL = screen.getByLabelText(/^Nome:$/i);
        expect(nomeEL).toBeInTheDocument();

        userEvent.type(nomeEL, USER_NAME)

        expect(nomeEL.value).toBe(USER_NAME)
    });

    it('se tem um botão de input email', () => {
        renderWithRouterAndRedux(<Login />);
        const USER_EMAIL = 'user@example.com';
        
        const emailEL = screen.getByLabelText(/^Email:$/i);
        expect(emailEL).toBeInTheDocument();

        userEvent.type(emailEL, USER_EMAIL)

        expect(emailEL.value).toBe(USER_EMAIL)
    })

    it.only('se tem o botão', async () => {
       const { history } = renderWithRouterAndRedux(<App />);
       const USER_EMAIL = 'user@example.com';
        
        const emailEL = screen.getByLabelText(/^Email:$/i);
        expect(emailEL).toBeInTheDocument();

        userEvent.type(emailEL, USER_EMAIL)

        const USER_NAME = 'User Teste';

        const nomeEL = screen.getByLabelText(/^Nome:$/i);
        expect(nomeEL).toBeInTheDocument();

        userEvent.type(nomeEL, USER_NAME)
        
        const btnPlayEL = screen.getByRole('button', { name: /^Jogar$/i});

        expect(btnPlayEL).toBeInTheDocument();
        
        userEvent.click(btnPlayEL);
      
        await waitFor(() => {
            expect(history.location.pathname).toBe('/game');
        }, { timeout: 3000 });
    });

    it('redireciona para "Settings"', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnConf = screen.getByRole('button', { name: /Configurar/i});

        userEvent.click(btnConf);
        
            expect(history.location.pathname).toBe('/settings');
    })
})