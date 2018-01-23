import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import {
  Pagination
} from '../../../commonViews';
import { getFavoriteRecipes } from '../../../actions/favoriteActions';
import FavoriteRecipeList from './FavoriteRecipeList';

/**
 * Favorite component
 *
 * @class Favorite
 *
 * @extends {React.Component}
 */
class Favorite extends React.Component {
  static propTypes = {
    getFavoriteRecipes: PropTypes.func.isRequired,
    userFavorites: PropTypes.arrayOf(PropTypes.object)
  };

  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userFavorites: [],
      message: 'Sorry! You do not have any favorite recipe',
      pages: 1,
      currentPaginatePage: 1,
      isLoading: true
    };
  }

  /**
   * @memberOf Favorite
   *
   * @returns {*} void
   */
  componentDidMount() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getFavoriteRecipes(offset);
  }

  /**
   * @param {any} nextprops
   *
   * @memberOf Favorite
   *
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.userFavorites) {
      const { userFavorites } = nextprops;
      this.setState({
        userFavorites: Object.assign(
          [],
          this.state.userFavorites,
          userFavorites
        ),
        pages: nextprops.pages,
        isLoading: false
      });
    }
  }

  /**
   * @memberOf Favorite
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
   * get Favorite recipes
   *
   * @returns {array} recipes
   */
  getRecipes() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getFavoriteRecipes(offset);
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
          <h3><b>Favorite Recipes</b></h3>
          <br />
          <div className="card-blocks" >
            {
              this.state.userFavorites.length === 0 ?
                (<h3>{this.state.message}</h3>)
                : <FavoriteRecipeList recipes={this.state.userFavorites} />
            }
          </div>
        </div>
        {
          (
            this.state.userFavorites
            && this.state.userFavorites.length > 0
            && this.state.pages > 1) ?
              <Pagination
                pageNumber={this.state.pages}
                onPaginateClick={this.onPaginateClick}
              /> : ''
        }
      </div>
    );
  }
}

Favorite.defaultProps = {
  userFavorites: []
};

const mapStateToProps = state => ({
  userFavorites: state.favorite.userFavorites,
  message: state.favorite.message,
  pages: state.favorite.pages
});

export { Favorite as PureFavorite };
export default connect(mapStateToProps, { getFavoriteRecipes })(Favorite);

