import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import { Pagination } from '../../commonViews';
import RecipeList from '../../commonViews/RecipeList';
import { getRecipesBySearch } from '../../actions/recipeActions';

const URLSearchParams = require('url-search-params');

/**
 * Search component
 *
 * @class Search
 *
 * @extends {React.Component}
 */
class Search extends React.Component {
  static propTypes = {
    getRecipesBySearch: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    location: PropTypes.objectOf(PropTypes.string),
    searchResult: PropTypes.arrayOf(PropTypes.object)
  };

  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      pages: 1,
      currentPaginatePage: 1,
      isLoading: true
    };
    this.onPaginateClick = this.onPaginateClick.bind(this);
  }

  /**
   * @param {any} nextprops
   *
   * @memberOf Search
   *
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.message) {
      this.setState({
        pages: nextprops.pages,
        isLoading: false
      });
    }
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
  getRecipes() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    const { search } = this.props.location;
    const url = new URLSearchParams(search);
    const keyword = url.get('sort');
    this.props.getRecipesBySearch(keyword, offset);
  }

  /**
   * render
   *
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
          <h3><b>Search Result</b></h3>
          <br />
          <div className="card-blocks" >
            {
              (this.props.searchResult.length < 1) ?
                <h2>{this.props.message}</h2> :
                <RecipeList recipes={this.props.searchResult} />
            }
          </div>
          <br />
        </div>
        {
          (
            this.props.searchResult
            && this.props.searchResult.length > 0
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

Search.defaultProps = {
  searchResult: [],
  location: {}
};

const mapStateToProps = state => ({
  message: state.recipe.message,
  searchResult: state.recipe.searchResult,
  pages: state.recipe.pages
});

export { Search as PureSearch };
export default connect(mapStateToProps, { getRecipesBySearch })(Search);

