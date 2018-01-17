import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import { Pagination } from '../../commonViews';
import RecipeList from '../../commonViews/RecipeList.jsx';
import { getUserRecipes } from '../../actions/recipeActions';

/**
 * MyRecipes component
 *
 * @class MyRecipes
 *
 * @extends {React.Component}
 */
class MyRecipes extends React.Component {
  static propTypes = {
    getUserRecipes: PropTypes.func.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      message: 'Sorry! You have not added any recipe',
      pages: 1,
      currentPaginatePage: 1,
      isLoading: true
    };
    this.onPaginateClick = this.onPaginateClick.bind(this);
  }

  /**
   * @memberOf MyRecipes
   *
   * @returns {*} void
   */
  componentDidMount() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getUserRecipes(offset);
  }

  /**
   * @param {any} nextprops
   *
   * @memberOf MyRecipe
   *
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.recipes) {
      const { recipes } = nextprops;
      this.setState({
        recipes: Object.assign([], this.state.recipes, recipes),
        pages: nextprops.pages,
        isLoading: false,
      });
    }
  }

  /**
   * @memberOf MyRecipes
   *
   * @returns {*} void
   */
  componentWillUnmount() {
    this.setState({
      isLoading: false
    });
  }

  /**
   * @description handles click event with pagination
   *
   * @param {object } data
   *
   * @return { object } currentPaginatePage
   */
  onPaginateClick = (data) => {
    const { selected } = data;
    this.setState({ currentPaginatePage: selected + 1 }, () => {
      this.getRecipes();
    });
  }

  /**
   * get top recipes
   *
   * @returns {array} recipes
   */
  getRecipes() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getUserRecipes(offset);
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    if (this.state.isLoading) {
      return (
        <Loader type="ball-scale-ripple-multiple" active />
      );
    }
    return (
      <div>
        <div className="add-padding">
          <h3><b>My Recipes</b></h3>
          <br />
          <div className="card-blocks" >
            {
              this.state.recipes.length === 0 ?
                <h3>{this.state.message}</h3>
                : <RecipeList recipes={this.props.recipes} />
            }
          </div>
          <br />
        </div>
        {
          (
            this.state.recipes && this.state.recipes.length > 0
            && this.state.pages > 1
          ) ?
            <Pagination
              pageNumber={this.state.pages}
              onPaginateClick={this.onPaginateClick}
            /> : ''
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.userRecipes,
  pages: state.recipe.pages
});

export { MyRecipes as PureMyRecipes };
export default connect(mapStateToProps, { getUserRecipes })(MyRecipes);

