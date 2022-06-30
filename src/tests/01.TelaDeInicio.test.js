import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { INITAL_STORE } from './Mocks/dataMock.js';
// import Login from '../pages/Login';
import App from '../App';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
     json: () => Promise.resolve(),
    }));
};

describe ('tela de Login', () => {

    beforeEach(mockFetch);
    afterEach(() => jest.clearAllMocks());

    it('se tem um botão de input nome e é possível escrever nele', () => {
        renderWithRouterAndRedux(<App />);
        const USER_NAME = 'User Teste';

        const nomeEL = screen.getByLabelText(/^Nome:$/i);
        expect(nomeEL).toBeInTheDocument();
        userEvent.type(nomeEL, USER_NAME)
        expect(nomeEL.value).toBe(USER_NAME)
    });

    it('se tem um botão de input email e é possível escrever nele', () => {
        renderWithRouterAndRedux(<App />);
        const USER_EMAIL = 'user@example.com';
        
        const emailEL = screen.getByLabelText(/^Email:$/i);
        expect(emailEL).toBeInTheDocument();
        userEvent.type(emailEL, USER_EMAIL)
        expect(emailEL.value).toBe(USER_EMAIL)
    })

    it('se tem o botão', async () => {
       const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE);
       const USER_EMAIL = 'user@example.com';
       const USER_NAME = 'User Teste';
        
        const emailEL = screen.getByLabelText(/^Email:$/i);
        expect(emailEL).toBeInTheDocument();
        userEvent.type(emailEL, USER_EMAIL)


        const nomeEL = screen.getByLabelText(/^Nome:$/i);
        expect(nomeEL).toBeInTheDocument();
        userEvent.type(nomeEL, USER_NAME)
        
        const btnPlayEL = screen.getByRole('button', { name: /^Jogar$/i});
        expect(btnPlayEL).toBeInTheDocument();
        userEvent.click(btnPlayEL);
        await waitFor(() => {
        expect(history.location.pathname).toBe('/game');
        });
    });

    it('redireciona para "Settings"', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnConf = screen.getByRole('button', { name: /^Configurar$/i});
        userEvent.click(btnConf);
       expect(history.location.pathname).toBe('/settings');
    })
});
