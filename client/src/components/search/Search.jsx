import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import {
  UserNavHeader,
  ProfileHeader,
  UserSection,
  UserNavMenu,
  Pagination,
  Footer
} from '../../common';
import RecipeList from '../recipeList/RecipeList.jsx';
import { getRecipesBySearch } from '../../actions/recipeActions';

/**
 * Search component
 *
 * @class Search
 *
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class Search extends React.Component {
  static propTypes = {
    getRecipesBySearch: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    location: PropTypes.objectOf(PropTypes.string).isRequired,
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
    if (nextprops.state.recipe.message) {
      this.setState({
        pages: nextprops.state.recipe.pages,
        isLoading: false
      });
    }
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
    if (this.state.isLoading) return (<Loader type="ball-scale-ripple-multiple" active />);
    return (
      <div>
        <UserNavHeader />
        <div className="banner-background">
          <div className="profile-background">
            <div className="container">
              <ProfileHeader />
              <br />
              <div className="row profile-landing">
                <section className="col-md-3 profile-details">
                  <UserSection />
                </section>
                <section className="col-md-9 profile-tabs" >
                  <div className="div-section">
                    <UserNavMenu />
                    <br />
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
                  </div>
                </section>
              </div>
              {
                (this.props.searchResult && this.props.searchResult.length > 0) ?
                  <Pagination
                    pageNumber={this.state.pages}
                    currentPaginatePage={this.state.currentPaginatePage}
                    onPaginateClick={this.onPaginateClick}
                  /> : '' }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Search.defaultProps = {
  searchResult: []
};

const mapStateToProps = state => ({
  message: state.recipe.message,
  searchResult: state.recipe.searchResult,
  pages: state.recipe.pages
});

export default connect(mapStateToProps, { getRecipesBySearch })(Search);

