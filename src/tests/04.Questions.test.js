import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import { INITAL_STORE, requestQuestions, INITIAL_RANKING } from "./Mocks/dataMock.js";

// const mockFetch = () => {
//   jest.spyOn(global, "fetch").mockImplementation(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(requestQuestions),
//     })
//   );
// };

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

describe("Testa as questões", () => {

  beforeEach(() => localStorage.setItem('ranking', JSON.stringify(INITIAL_RANKING)));

  it("Testa se as questões aparecem na tela", async () => {
    renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");

    const countEL = screen.getByTestId('count-btn');
    expect(countEL).toBeInTheDocument();
    expect(countEL).toHaveTextContent(30);

    await waitFor(() => expect(countEL).toHaveTextContent(29), { timeout: 3000 });

    const cardQuestDiv = screen.getByTestId("answer-options");
    expect(cardQuestDiv).toBeInTheDocument();

    const cardQuestText = screen.getByTestId("question-text");
    expect(cardQuestText).toBeInTheDocument();
    
    const cardQuestCategory = screen.getByTestId("question-category");
    expect(cardQuestCategory).toBeInTheDocument();
    
    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();

    const wrongAnswers = screen.getAllByTestId('wrong-answer-0');
    expect(wrongAnswers).toHaveLength(3);

    let nextBtn = screen.queryByTestId('btn-next');
    expect(nextBtn).not.toBeInTheDocument();
    
    userEvent.click(correctAnswer);
    
    expect(correctAnswer.className).toBe('right');
    expect(correctAnswer).toBeDisabled();
    wrongAnswers.forEach((answer) => expect(answer).toBeDisabled())
    nextBtn = screen.queryByTestId('btn-next');
    expect(nextBtn).toBeInTheDocument();
  });

  it("Testa se o botão de next muda a pergunta", async () => {
    renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");
    const TXT = requestQuestions[0].question;

    const question1 = screen.getByTestId("question-text");
    expect(question1).toHaveTextContent(TXT)
    const resposta1 = screen.getByTestId('correct-answer');
    
    expect(question1).toBeInTheDocument();
    
    userEvent.click(resposta1);
    const btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext);
    await waitFor(() => expect(question1).not.toHaveTextContent(TXT));
  });

  it("Testa se com token invalido volta para página inicial", () => {
    localStorage.setItem('token', 'INVALID');
    const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");

    expect(history.location.pathname).toBe('/');
    
  });

  it("Testa vai para página de feedback no fim das questões", async () => {
    localStorage.setItem('token', '0b03b51ebc8a17ff01e33b0f60bea081d328ec13ae8caaba9fb2b6e660b09ddd')
    const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");

    for(let i = 0; i < 5; i++) {
      const correctAnswer = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer);
      await waitFor(()=> {
        const nextBtn = screen.queryByTestId('btn-next');
        expect(nextBtn).toBeInTheDocument();
        userEvent.click(nextBtn);
      })
    }

    await waitFor(() => {
      expect(history.location.pathname).toBe('/feedback');
    })
    
  });
  it('Checa se depois de 30 segundos o cara perde a resposta', async () => {
    renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");
    const countEL = screen.getByTestId('count-btn');

    await waitFor(() => {
      expect(countEL).toHaveTextContent(0)
    }, { timeout: 31500 });

    await waitFor(() => {
      const correctAnswer = screen.getByTestId('correct-answer');
      expect(correctAnswer.className).toBe('right');
    }, { timeout: 31500 })
  }, 32000)
  
  it('Checa pontuação no hard', async () => {
    renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");
    const expectScore = 100;
    const headerScore = screen.getByTestId('header-score');
    expect(headerScore).toHaveTextContent(0);
    const correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);
    await waitFor(() =>  expect(headerScore).toHaveTextContent(expectScore));
  });

  it('Checa pontuação no easy', async () => {
    renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");
    let correctAnswer = screen.getByTestId('correct-answer');
    userEvent.click(correctAnswer);
    const nextBtn = screen.queryByTestId('btn-next');
    userEvent.click(nextBtn);
    await waitFor(() => expect(nextBtn).not.toBeInTheDocument());
    correctAnswer = screen.getByTestId('correct-answer');
    const expectScore = 140;
    const headerScore = screen.getByTestId('header-score');
    userEvent.click(correctAnswer);
    await waitFor(() =>  expect(headerScore).toHaveTextContent(expectScore));
  })

  it('Checa pontuação no médio', async () => {
    renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");
    
    let correctAnswer = screen.getByTestId('correct-answer');

    userEvent.click(correctAnswer);
    let nextBtn = screen.queryByTestId('btn-next');
    userEvent.click(nextBtn);
    await waitFor(() => expect(nextBtn).not.toBeInTheDocument());
    
    correctAnswer = screen.queryByTestId('correct-answer');
    userEvent.click(correctAnswer);
    nextBtn = screen.queryByTestId('btn-next');
    userEvent.click(nextBtn);
    await waitFor(() => expect(nextBtn).not.toBeInTheDocument());

    correctAnswer = screen.queryByTestId('correct-answer');
    userEvent.click(correctAnswer);
    
    const expectScore = 210;
    const headerScore = screen.queryByTestId('header-score');
    // const correctAnswer = screen.getByTestId('correct-answer');
    await waitFor(() =>  expect(headerScore).toHaveTextContent(expectScore));
  })

  it('Checa se vc erra uma questão', async () => {
    renderWithRouterAndRedux(<App />, INITAL_STORE, "/game");
    
    const wrongAnswers = screen.getAllByTestId('wrong-answer-0');
    userEvent.click(wrongAnswers[0]);
    const headerScore = screen.queryByTestId('header-score');
    expect(headerScore).toHaveTextContent(0);
  });

  it('Checa se as questions nao chegarem', async () => {
      
  const INITAL_STORE_T = {
    player: {
      name: "Alguem",
        assertions: 0,
        score: 0,
        gravatarEmail: "alguem@algum.com",
        imgURL: "https://www.gravatar.com/avatar/be343b5e35028635a6cd02ee72655332",
        token: "0b03b51ebc8a17ff01e33b0f60bea081d328ec13ae8caaba9fb2b6e660b09ddd",
      },
      trivia: {
        questions: null,
      } 
    }       
    renderWithRouterAndRedux(<App />, INITAL_STORE_T, "/game");
    await waitFor(() => {
        const h1FuEL = screen.queryByRole('heading', { name: /FUUU....DEUMERDA/i, level: 1 });
        expect(h1FuEL).toBeInTheDocument();
    })
    const correctAnswer = screen.queryByTestId('correct-answer');
    expect(correctAnswer).not.toBeInTheDocument();

  })
});
