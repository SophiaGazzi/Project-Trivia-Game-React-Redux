import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { nextQuestion, addScore } from '../redux/actions';

const INITIAL_STATE = {
  countTime: 30,
  hasAnswered: false,
  answers: [],
  currentQuestion: {},
};
const TIME_SECOND = 1000;

let TIME_ID = null;

class Questions extends React.Component {
state = INITIAL_STATE;

componentDidMount() {
  const token = localStorage.getItem('token');
  const { history } = this.props;
  if (token === 'INVALID') {
    history.push('/');
  }
  TIME_ID = setInterval(this.timeCounter, TIME_SECOND);
  const { questions, currentId } = this.props;
  const { answers } = this.state;
  let { currentQuestion } = this.state;
  if (questions.length) {
    currentQuestion = questions.find((_curr, id) => id === currentId);
    currentQuestion.incorrect_answers.forEach((curr) => (
      answers.push({ option: curr, is: 'wrong' })));
    answers.push({ option: currentQuestion.correct_answer, is: 'right' });
    answers.sort(() => Math.round(Math.random()) * 2 - 1);
    this.setState({
      currentQuestion,
      answers,
    });
  }
}

timeCounter = () => {
  const { countTime } = this.state;
  if (countTime > 0) {
    this.setState({
      countTime: countTime - 1,
    });
  } else {
    clearInterval(TIME_ID);
    this.setState({ hasAnswered: true });
  }
}

answerButton = (isRight) => {
  clearInterval(TIME_ID);
  this.setState({ hasAnswered: true });
  const { score } = this.props;
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
    score(countTime, points);
  }
};

nextBtn = async () => {
  this.setState({ hasAnswered: false, countTime: 30 });
  TIME_ID = setInterval(this.timeCounter, TIME_SECOND);
  // entra aqui a action de pegar o novo ID
  const { next, history } = this.props;
  await next();
  const { questions, currentId } = this.props;
  const four = 4;
  if (currentId > four) history.push('/feedback');
  let { currentQuestion, answers } = this.state;
  answers = [];
  if (questions.length) {
    currentQuestion = questions.find((_curr, id) => id === currentId);
    currentQuestion.incorrect_answers.forEach((curr) => (
      answers.push({ option: curr, is: 'wrong' })));
    answers.push({ option: currentQuestion.correct_answer, is: 'right' });
    answers.sort(() => Math.round(Math.random()) * 2 - 1);
    this.setState({
      currentQuestion,
      answers,
    });
  }
}

render() {
  const { hasAnswered, currentQuestion, answers, countTime } = this.state;
  const { currentId } = this.props;
  return (
    <div>
      <p data-testid="question-category">{currentQuestion?.category}</p>
      <p data-testid="question-text">{currentQuestion?.question}</p>
      <p>{ countTime }</p>
      <section data-testid="answer-options">
        {answers.map((curr) => (
          <button
            className={ hasAnswered && curr.is }
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
            data-testid="btn-next"
            onClick={ this.nextBtn }
            type="button"
          >
            Próximo
          </button>)}
      </section>
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
  score: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  currentId: state.trivia.current_question,
});

// const mapDispatchToProps = {
//  next: nextQuestion,
//  score: addScore,
// };

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(nextQuestion),
  score: (timer, dificuldade) => dispatch(addScore(timer, dificuldade)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
