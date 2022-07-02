/* eslint-disable no-magic-numbers */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextQuestion, addScore } from '../redux/actions';

// const musicURL = 'https://soundcloud.com/rileywalz/kahoot-in-game-music-20-second?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

const INITIAL_STATE = {
  countTime: 30,
  hasAnswered: false,
  answers: [],
  currentQuestion: {},
  deuMerda: false,
};
const TIME_SECOND = 1000;

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// let TIME_ID = null;

class Questions extends React.Component {
state = INITIAL_STATE;

// audio = new Audio(url('../show.mp3'));
async componentDidMount() {
  const token = localStorage.getItem('token');
  const { history } = this.props;
  if (token === 'INVALID') {
    history.push('/');
    return;
  }
  // const ONE_SECOND = 1000;
  // await wait(ONE_SECOND);
  this.TIME_ID = setInterval(this.timeCounter, TIME_SECOND);
  const { questions, currentId } = this.props;
  const { answers } = this.state;
  const array = [...answers];
  let { currentQuestion } = this.state;
  console.log(questions);
  if (questions && questions.length) {
    currentQuestion = questions.find((_curr, id) => id === currentId);
    const upDateQuestion = this.replaceFunc(currentQuestion.question);
    currentQuestion = {
      ...currentQuestion,
      question: upDateQuestion,
    };
    currentQuestion.incorrect_answers.forEach((curr) => (
      array.push({ option: this.replaceFunc(curr), is: 'wrong' })));
    array.push({ option: this.replaceFunc(currentQuestion.correct_answer), is: 'right' });
    array.sort(() => Math.round(Math.random()) * 2 - 1);
    this.setState({
      currentQuestion,
      answers: array,
    });
  } else {
    this.setState({ deuMerda: true });
  }
}

  timeCounter = () => {
    const { countTime } = this.state;
    if (countTime > 0) {
      this.setState({
        countTime: countTime - 1,
      });
    } else {
      clearInterval(this.TIME_ID);
      this.setState({ hasAnswered: true });
    }
  }

answerButton = (isRight) => {
  clearInterval(this.TIME_ID);
  this.setState({ hasAnswered: true });
  const { newScore } = this.props;
  if (isRight === 'right') {
    const { currentQuestion: { difficulty }, countTime } = this.state;
    const ONE = 1;
    const TWO = 2;
    const THREE = 3;
    let points = 0;
    if (difficulty === 'easy') {
      points = ONE;
    } else if (difficulty === 'medium') {
      points = TWO;
    } else {
      points = THREE;
    }
    newScore(countTime, points);
  }
};

nextBtn = () => {
  this.setState({ hasAnswered: false, countTime: 30 }, async () => {
    this.TIME_ID = setInterval(this.timeCounter, TIME_SECOND);
    // entra aqui a action de pegar o novo ID
    const { next, history } = this.props;
    await next();
    const { questions, currentId } = this.props;
    if (currentId > questions.length - 1) {
      this.setState(INITIAL_STATE, () => {
        history.push('/feedback');
      });
      return;
    }
    let { currentQuestion, answers } = this.state;
    answers = [];
    currentQuestion = questions.find((_curr, id) => id === currentId);
    const upDateQuestion = this.replaceFunc(currentQuestion.question);
    currentQuestion = {
      ...currentQuestion,
      question: upDateQuestion,
    };
    currentQuestion.incorrect_answers.forEach((curr) => (
      answers.push({ option: this.replaceFunc(curr), is: 'wrong' })));
    answers
      .push({ option: this.replaceFunc(currentQuestion.correct_answer), is: 'right' });
    answers.sort(() => Math.round(Math.random()) * 2 - 1);
    this.setState({
      currentQuestion,
      answers,
    });
  });
}

replaceFunc = (string) => string
  .replace(/&#039;/g, '\'')
  .replace(/&quot;/g, '"')
  .replace(/&amp/g, '&')
  .replace(/&deg/g, '°')
  .replace(/&rsquo;/g, '´')
  .replace(/&uuml;/g, 'ü')
  .replace(/&eacute;/g, 'é');

render() {
  const { hasAnswered, currentQuestion, answers, countTime, deuMerda } = this.state;
  const { currentId } = this.props;
  return (
    <div className="trivia-page">
      <section className="counter-category">
        <p data-testid="question-category">
          Category:
          {' '}
          {currentQuestion?.category}
        </p>
        <div className={ countTime >= 10
          ? 'count-btn count-yellow' : 'count-btn count-red' }
        >
          <p>
            { countTime }
          </p>
        </div>
      </section>
      <p
        data-testid="question-text"
      >
        {currentQuestion?.question}
      </p>
      {deuMerda && <h1>FUUU....DEUMERDA</h1>}
      <section className="botoes" data-testid="answer-options">
        {answers.map((curr) => (
          <button
            // eslint-disable-next-line no-nested-ternary
            className={ hasAnswered
              ? (curr.is === 'right'
                ? 'btn btn-success' : 'btn btn-danger')
              : 'bola btn btn-warning' }
            type="button"
            disabled={ hasAnswered }
            key={ curr.option }
            onClick={ () => this.answerButton(curr.is) }
            data-testid={ curr.is === 'wrong'
              ? `wrong-answer-${currentId}` : 'correct-answer' }
          >
            { curr.option }
          </button>))}
        {hasAnswered && (
          <button
            id="button-next"
            className="btn-dark btn"
            onClick={ this.nextBtn }
            type="button"
          >
            Próximo
          </button>)}
      </section>
      {/* <audio preload="metadata" scr={ musicURL } autoPlay controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio> */}
    </div>
  );
}
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentId: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  next: PropTypes.func.isRequired,
  newScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  currentId: state.trivia.current_question,
});

// const mapDispatchToProps = {
//  next: nextQuestion,
//  score: newScore,
// };

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextQuestion),
  newScore: (timer, dificuldade) => dispatch(addScore(timer, dificuldade)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
