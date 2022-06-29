import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const NUMBER_TRES = 3;

class Feedback extends Component {
  render() {
    const { acertos } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { acertos < NUMBER_TRES ? 'Could be better...' : 'Well Done!' }
        </p>
        {/* <p data-testid="feedback-total-question">{ score }</p> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
});

Feedback.propTypes = {
  acertos: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
