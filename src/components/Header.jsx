import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requireGravatar } from '../redux/actions';

class Header extends Component {
  render() {
    const { name, imgURL, score } = this.props;
    return (
      <div>
        <p
          data-testid="header-player-name"
        >
          { name }
        </p>
        <img
          data-testid="header-profile-picture"
          src={ imgURL }
          alt="img-avatar"
        />
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imgURL: state.player.imgURL,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  getImage: (gravatarEmail) => dispatch(requireGravatar(gravatarEmail)),
});

Header.propTypes = {
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number,
};

Header.defaultProps = {
  score: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
