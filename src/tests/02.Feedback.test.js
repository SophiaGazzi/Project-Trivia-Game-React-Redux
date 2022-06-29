import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';

describe('', () => {
    it('', () => {
        renderWithRouterAndRedux(<Feedback />)

        const nameEL = screen.getByTestId('header-player-name');
        const imgEL = screen.getByTestId('header-profile-picture');
        const scoreEL = screen.getByTestId('header-score');
        const feedbackEl = screen.getAllByTestId('feedback-text');

        expect(nameEL).toBeInTheDocument()
        expect(imgEL).toBeInTheDocument()
        expect(scoreEL).toBeInTheDocument()
        expect(feedbackEl).toBeInTheDocument()


    })
    it('', () => {
        
    })
})