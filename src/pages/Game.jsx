import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="questions-container">
        <img className="thinkingGif" src="https://i.pinimg.com/originals/3b/dc/ab/3bdcab2937d0f583ba8ed16e9bd6463f.gif" alt="thinking gif" />
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.player.token,
});

export default connect(mapStateToProps)(Game);
