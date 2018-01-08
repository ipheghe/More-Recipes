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
import RecipeList from '../recipeList/RecipeList.jsx';
import { getTopRecipes } from '../../actions/recipeActions';


/**
 * Dashboard component
 * @class Dashboard
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class Dashboard extends React.Component {
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
      message: 'Sorry! You do not have any favorite recipe',
      pages: 1,
      currentPaginatePage: 1,
      isLoading: true
    };
    this.onPaginateClick = this.onPaginateClick.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
  }

  /**
   * @memberOf Favorite
   * @returns {*} void
   */
  componentDidMount() {
    const offset = 6 * (this.state.currentPaginatePage - 1);
    this.props.getTopRecipes(offset);
  }

  /**
   * @param {any} nextprops
   * @memberOf UserNavHeader
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.recipe) {
      const { recipeList } = nextprops.state.recipe;
      this.setState({
        recipes: Object.assign([], this.state.recipes, recipeList),
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
  onPaginateClick = (page) => {
    this.setState({ currentPaginatePage: page }, () => {
      this.getRecipes();
    });
  }

  /**
   * get top recipes
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
                      <h3><b>Top Recipes</b></h3>
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

Dashboard.defaultProps = {
  recipes: []
};

const mapStateToProps = state => ({
  recipes: state.recipe.recipeList,
  pages: state.recipe.pages
});

export default connect(mapStateToProps, { getTopRecipes })(Dashboard);
