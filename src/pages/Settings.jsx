import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategoriesThunk, setGameConfigAction } from '../redux/actions';

const INITIAL_STATE = {
  category: null,
  quantity: '5',
  difficulty: null,
  difficultyList: [
    { id: 1, dif: 'easy' },
    { id: 2, dif: 'medium' },
    { id: 3, dif: 'hard' },
    { id: 4, dif: 'Random' },
  ],
  ammountList: ['5', '10', '20', '30', '40', '50'],
  categoriesList: [],
};

class Settings extends Component {
  state = INITIAL_STATE

  async componentDidMount() {
    const { getCategories } = this.props;
    await getCategories();
    const { categories } = this.props;
    this.setState({ categoriesList: categories });
  }

  onInputChange = ({ target }) => {
    const value = target.value === 'Random' ? null : target.value;
    this.setState({ [target.name]: value });
  }

  backToLogin = () => {
    const { history, setConfig } = this.props;
    const { difficulty, category, quantity } = this.state;
    setConfig(difficulty, quantity, category);
    history.push('/');
  }

  render() {
    const { category,
      quantity, difficulty, difficultyList, ammountList, categoriesList } = this.state;
    // const { categories } = this.props;
    return (
      <div className="settings-page">
        <h1 className="settings-title">⚙ Configurações </h1>
        <label className="label-settings" htmlFor="category">
          Categorias:
          <select
            className="form-select"
            value={ category }
            id="category"
            name="category"
            onChange={ this.onInputChange }
          >
            { categoriesList.map((categor) => (
              <option value={ categor.id } key={ categor.id }>{categor.name}</option>
            ))}
            <option value="Random">Random</option>
          </select>
        </label>
        <label className="label-settings" htmlFor="difficulty">
          Dificuldade:
          <select
            className="form-select"
            value={ difficulty }
            id="difficulty"
            name="difficulty"
            onChange={ this.onInputChange }
          >
            { difficultyList.map((dif) => (
              <option value={ dif.dif } key={ dif.id }>{ dif.dif }</option>
            ))}
          </select>
        </label>
        <label className="label-settings" htmlFor="quantity">
          Quantidade:
          <select
            className="form-select"
            value={ quantity }
            id="quantity"
            name="quantity"
            onChange={ this.onInputChange }
          >
            { ammountList.map((ammount) => (
              <option value={ ammount } key={ ammount }>{ ammount }</option>
            ))}
          </select>
        </label>
        <button
          className="btn btn-dark btn-settings"
          type="button"
          onClick={ this.backToLogin }
        >
          Ok
        </button>
      </div>
    );
  }
}
const mapStateToProps = ({ settings }) => ({
  categories: settings.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesThunk()),
  setConfig: (difficulty, category, quantity) => {
    dispatch(setGameConfigAction(difficulty, category, quantity));
  },
});

Settings.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setConfig: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
