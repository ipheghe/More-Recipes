import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import { RecipeList, Pagination } from '../../commonViews';
import { getTopRecipes } from '../../actions/recipeActions';


/**
 * TopRecipes component
 *
 * @class TopRecipes
 *
 * @extends {React.Component}
 */
class TopRecipes extends React.Component {
  static propTypes = {
    getTopRecipes: PropTypes.func.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.object)
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      message: 'Sorry! No Recipe available yet',
      pages: 1,
      currentPaginatePage: 1,
      isLoading: true,
    };
    this.onPaginateClick = this.onPaginateClick.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
  }

  /**
   * @memberOf TopRecipes
   * @returns {*} void
   */
  componentDidMount() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getTopRecipes(offset);
  }

  /**
   * @param {any} nextprops
   * @memberOf TopRecipes
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
   * @memberOf TopRecipes
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
   * @param { object } data
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
  getRecipes = () => {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getTopRecipes(offset);
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
          <h3><b>Top Recipes</b></h3>
          <br />
          <div className="card-blocks" >
            {
              this.state.recipes.length === 0 ?
                (<h3>{this.state.message}</h3>)
                : <RecipeList recipes={this.props.recipes} />
            }
          </div>
          <br />
        </div>
        {
          (this.state.pages > 1) ?
            <Pagination
              pageNumber={this.state.pages}
              onPaginateClick={this.onPaginateClick}
            /> : ''
        }
      </div>
    );
  }
}

TopRecipes.defaultProps = {
  recipes: []
};

const mapStateToProps = state => ({
  recipes: state.recipe.recipeList,
  pages: state.recipe.pages
});

export { TopRecipes as PureTopRecipes };
export default connect(mapStateToProps, { getTopRecipes })(TopRecipes);
