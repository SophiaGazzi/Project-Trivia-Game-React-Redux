import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addPlayerInRanking, clearStore } from '../redux/actions';

const NUMBER_TRES = 3;

class Feedback extends Component {
  componentDidMount() {
    const { addRanking, score, name, imgURL } = this.props;
    addRanking(name, imgURL, score);
  }

  nextGame = () => {
    const { history, clean } = this.props;
    clean();
    history.push('/');
  }

  render() {
    const { acertos, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { acertos < NUMBER_TRES ? 'Could be better...' : 'Well Done!' }
        </p>
        <p data-testid="feedback-total-question">
          { acertos }
        </p>
        <p data-testid="feedback-total-score">
          { score }
        </p>
        <button
          onClick={ this.nextGame }
          data-testid="btn-play-again"
          type="button"
        >
          Play Again
        </button>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  imgURL: state.player.imgURL,
});

const mapDispatchToProps = (dispatch) => ({
  addRanking: (name, imgURL, score) => dispatch(addPlayerInRanking(name, imgURL, score)),
  clean: () => dispatch(clearStore),
});

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  addRanking: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  clean: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
