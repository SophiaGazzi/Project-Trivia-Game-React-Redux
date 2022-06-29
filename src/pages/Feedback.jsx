import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

const NUMBER_TRES = 3;

class Feedback extends Component {
  render() {
    const { acertos, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { acertos < NUMBER_TRES ? 'Could be better...' : 'Well Done!' }
        </p>
        <p data-testid="feedback-total-question">{ acertos }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Play Again</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
