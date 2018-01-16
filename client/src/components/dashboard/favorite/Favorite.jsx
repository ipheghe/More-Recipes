import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import {
  Pagination
} from '../../../commonViews';
import { getFavoriteRecipes } from '../../../actions/favoriteActions';
import FavoriteRecipeList from './FavoriteRecipeList.jsx';

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
   * @param {integer } page
   *
   * @return { object } currentPaginatePage
   */
  onPaginateClick(page) {
    this.setState({ currentPaginatePage: page }, () => {
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
   * @description handles next click event with pagination
   *
   * @param {SytheticEvent} event
   *
   * @return { object } currentPaginatePage
   */
  handleNext = (event) => {
    event.preventDefault();
    const { currentPaginatePage, pages } = this.state;
    let nextPage;
    if ((currentPaginatePage + 1) > pages) {
      nextPage = 1;
    } else {
      nextPage = currentPaginatePage + 1;
    }
    this.setState({ currentPaginatePage: nextPage }, () => {
      this.getRecipes();
    });
  }

  /**
   * @description handles previous click event with pagination
   *
   * @param {SytheticEvent} event
   *
   * @return { object } currentPaginatePage
   */
  handlePrevious = (event) => {
    event.preventDefault();
    const { currentPaginatePage, pages } = this.state;
    let previousPage;
    if ((currentPaginatePage - 1) === 0) {
      previousPage = pages;
    } else {
      previousPage = currentPaginatePage - 1;
    }
    this.setState({ currentPaginatePage: previousPage }, () => {
      this.getRecipes();
    });
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
                currentPaginatePage={this.state.currentPaginatePage}
                onPaginateClick={this.onPaginateClick}
                next={this.handleNext}
                previous={this.handlePrevious}
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

