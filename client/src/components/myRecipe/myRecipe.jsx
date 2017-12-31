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
import RecipeList from '../recipeList/recipeList.jsx';
import { getUserRecipes } from '../../actions/recipeActions';

/**
 * MyRecipe component
 * @class MyRecipe
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class MyRecipe extends React.Component {
  static propTypes = {
    getUserRecipes: PropTypes.func.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      message: '',
      pages: 1,
      currentPaginatePage: 1,
      isLoading: true
    };
    this.onPaginateClick = this.onPaginateClick.bind(this);
  }

  /**
   * @memberOf MyRecipe
   * @returns {*} void
   */
  componentDidMount() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getUserRecipes(offset);
  }

  /**
   * @param {any} nextprops
   * @memberOf MyRecipe
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.recipe) {
      const { userRecipes } = nextprops.state.recipe;
      this.setState({
        recipes: Object.assign([], this.state.recipes, userRecipes),
        message: nextprops.state.recipe.message,
        pages: nextprops.state.recipe.pages,
        isLoading: false,
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
    this.props.getUserRecipes(offset);
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
                      <h3><b>My Recipes</b></h3>
                      <br />
                      <div className="card-blocks" >
                        {
                          this.state.recipes.length === 0 ?
                            <h5>{this.state.message}</h5>
                            : <RecipeList recipes={this.props.recipes} />
                        }
                      </div>
                      <br />
                    </div>
                  </div>
                </section>
              </div>
              {
                (this.state.recipes && this.state.recipes.length > 0) ?
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

const mapStateToProps = state => ({
  recipes: state.recipe.userRecipes,
  pages: state.recipe.pages
});

export default connect(mapStateToProps, { getUserRecipes })(MyRecipe);

