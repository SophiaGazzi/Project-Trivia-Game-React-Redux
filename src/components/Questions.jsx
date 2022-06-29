import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  contTime: 30,
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
  const { contTime } = this.state;
  if (contTime > 0) {
    this.setState({
      contTime: contTime - 1,
    });
  } else {
    clearInterval(TIME_ID);
  }
}

answerButton = () => {
  this.setState({ hasAnswered: true });
};

render() {
  const { hasAnswered, currentQuestion, answers } = this.state;
  const { currentId } = this.props;
  return (
    <div>
      <p data-testid="question-category">{currentQuestion?.category}</p>
      <p data-testid="question-text">{currentQuestion?.question}</p>
      <section data-testid="answer-options">
        {answers.map((curr) => (
          <button
            className={ hasAnswered && curr.is }
            type="button"
            key={ curr.option }
            onClick={ this.answerButton }
            data-testid={ curr.is === 'wrong'
              ? `wrong-answer-${currentId}` : 'correct-answer' }
          >
            { curr.option }
          </button>))}
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

};

const mapStateToProps = (state) => ({
  questions: state.trivia.questions,
  currentId: state.trivia.current_question,
});

export default connect(mapStateToProps)(Questions);
