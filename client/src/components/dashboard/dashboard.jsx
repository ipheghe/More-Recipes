import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserNavHeader, ProfileHeader, UserSection, UserNavMenu } from '../../views/index';
import RecipeList from '../recipeList/recipeList.jsx';
import { getTopRecipes } from '../../actions/recipe';


/**
 * Dashboard component
 * @class Dashboard
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class Dashboard extends React.Component {
  static propTypes = {
    getTopRecipes: PropTypes.func.isRequired,
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
      isLoading: true
    };
  }

  /**
   * @memberOf Favorite
   * @returns {*} void
   */
  componentDidMount() {
    this.props.getTopRecipes();
  }

  /**
   * @param {any} nextprops
   * @memberOf UserNavHeader
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.recipe) {
      const { recipeData } = nextprops.state.recipe;
      this.setState({
        recipes: Object.assign([], this.state.recipes, recipeData),
        message: nextprops.state.recipe.message,
        isLoading: false,
      });
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    if (this.state.isLoading) return (<div>IS LOADING....</div>);
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
                            : <RecipeList recipes={this.state.recipes} />
                        }
                      </div>
                      <br />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  recipes: state.recipe.recipeData
});

export default connect(mapStateToProps, { getTopRecipes })(Dashboard);
