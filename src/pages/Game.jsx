import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  // componentDidMount() {
  //   const token = localStorage.getItem('token');
  //   console.log(token, 'tokenGame');
  //   const { history } = this.props;
  //   if (token === 'INVALID') {
  //     history.push('/');
  //   }
  // }

  render() {
    const { history } = this.props;
    // // const { token } = this.props;
    // const token = localStorage.getItem('token');
    // console.log(token, 'tokenGame');
    return (
      <div>
        {/* { token === 'INVALID' && <Redirect to="/" />} */}
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  // token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
});

export default connect(mapStateToProps)(Game);
