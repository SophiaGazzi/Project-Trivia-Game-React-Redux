import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  contTime: 30,
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

render() {
  const { questions, currentId } = this.props;
  const answers = [];
  let currentQuestion = {};
  if (questions.length) {
    currentQuestion = questions.find((_curr, id) => id === currentId);
    currentQuestion.incorrect_answers.forEach((curr) => (
      answers.push({ option: curr, is: 'wrong' })));
    answers.push({ option: currentQuestion.correct_answer, is: 'right' });
    answers.sort((a, b) => {
      const optionOne = 1;
      const optionTwo = -1;
      if (a.name > b.name) {
        return optionOne;
      }
      if (a.name < b.name) {
        return optionTwo;
      }
      return 0;
    });
  }

  return (
    <div>
      <p data-testid="question-category">{currentQuestion?.category}</p>
      <p data-testid="question-text">{currentQuestion?.question}</p>
      <section data-testid="answer-options">
        {answers.map((curr) => (
          <button
            type="button"
            key={ curr.option }
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
