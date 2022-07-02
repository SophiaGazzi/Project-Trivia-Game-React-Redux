import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, imgURL, score } = this.props;
    return (
      <header>
        <div>
          <img
            className="avatar"
            data-testid="header-profile-picture"
            src={ imgURL }
            alt="img-avatar"
          />
          <p
            data-testid="header-player-name"
          >
            { name }
          </p>
        </div>
        <p data-testid="header-score">
          Pontuação:
          { ' ' }
          { score }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  imgURL: state.player.imgURL,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number,
};

Header.defaultProps = {
  score: 0,
};

export default connect(mapStateToProps)(Header);
