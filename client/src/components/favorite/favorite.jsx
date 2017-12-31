import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import {
  UserNavHeader,
  ProfileHeader,
  UserSection,
  UserNavMenu,
  Footer,
  Pagination
} from '../../common';
import { getFavoriteRecipes } from '../../actions/favoriteActions';
import FavoriteRecipeList from '../favoriteRecipeList/favoriteRecipeList.jsx';

/**
 * Favorite component
 * @class Favorite
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class Favorite extends React.Component {
  static propTypes = {
    getFavoriteRecipes: PropTypes.func.isRequired,
    userFavorites: PropTypes.arrayOf(PropTypes.object)
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userFavorites: [],
      message: '',
      pages: 1,
      currentPaginatePage: 1,
      isLoading: true
    };
  }

  /**
   * @memberOf Favorite
   * @returns {*} void
   */
  componentDidMount() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getFavoriteRecipes(offset);
  }

  /**
   * @param {any} nextprops
   * @memberOf Favorite
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.favorite) {
      const { userFavorites } = nextprops.state.favorite;
      this.setState({
        userFavorites: Object.assign([], this.state.userFavorites, userFavorites),
        message: nextprops.state.favorite.message,
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
                      <h3><b>Favorite Recipes</b></h3>
                      <br />
                      <div className="card-blocks" >
                        {
                          this.state.userFavorites.length === 0 ?
                            (<h5>{this.state.message}</h5>)
                            : <FavoriteRecipeList recipes={this.props.userFavorites} />
                        }
                      </div>
                      <br />
                    </div>
                  </div>
                </section>
              </div>
              {
                (this.state.userFavorites && this.state.userFavorites.length > 0) ?
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

Favorite.defaultProps = {
  userFavorites: []
};

const mapStateToProps = state => ({
  userFavorites: state.favorite.userFavorites,
  message: state.favorite.message,
  pages: state.recipe.pages
});

export default connect(mapStateToProps, { getFavoriteRecipes })(Favorite);

