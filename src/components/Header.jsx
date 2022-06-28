import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { imgURL, name, email } = this.props;
    return (
      <div>
        <p>{ name }</p>
        <p>{ email }</p>
        <img
          data-testid="header-profile-picture"
          src={ imgURL }
          alt="img-avatar"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imgURL: state.login.imgURL,
  name: state.login.name,
  email: state.login.email,
});

Header.propTypes = {
  imgURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
