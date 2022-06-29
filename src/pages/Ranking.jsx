import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearStore } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  }

  componentDidMount = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  };

nextGame = () => {
  const { history, clean } = this.props;
  clean();
  history.push('/');
}

render() {
  const { ranking } = this.state;

  return (
    <div>
      <h1 data-testid="ranking-title">Ranking</h1>
      <section>
        {ranking.map((curr, id) => (
          <div key={ id }>
            <img alt={ curr.name } src={ curr.picture } />
            <h4 data-testid={ `player-name-${id}` }>{curr.name}</h4>
            <h4 data-testid={ `player-score-${id}` }>{curr.name && curr.score}</h4>
          </div>
        ))}
      </section>
      <button
        data-testid="btn-go-home"
        type="button"
        onClick={ this.nextGame }
      >
        Retornar à tela inicial
      </button>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  clean: () => dispatch(clearStore),
});

Ranking.propTypes = {
  clean: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
