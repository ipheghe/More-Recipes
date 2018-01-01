import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainHeader, Footer } from '../../common';
import LandingRecipeList from '../landingRecipeList/landingRecipeList.jsx';
import { getTopRecipes } from '../../actions/recipeActions';

/**
 * Landing page commponent
 * @param {function} onComponentDidMount - callback on ComponentDidMount
 */
class Landing extends React.Component {
  static propTypes = {
    getTopRecipes: PropTypes.func.isRequired,
    recipeList: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  /**
   * @memberOf Landing
   * @returns {*} void
   */
  componentDidMount() {
    this.props.getTopRecipes();
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
        <MainHeader />
        <div className="landing-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-7 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br />
                <br />
                <a href="#top-recipes">
                  <button className="btn btn-success">View top recipes</button>
                </a>
                <p className="arrow-key">
                  <i className="fa fa-arrow-down" aria-hidden="true" />
                  <i className="fa fa-arrow-down" aria-hidden="true" />
                  <i className="fa fa-arrow-down" aria-hidden="true" />
                </p>
              </section>
              <section className="col-md-5 account">
                <div>
                  <a href="#login">
                    <button
                      type="button"
                      className="btn btn-success"
                      id="login"
                      data-toggle="modal"
                      data-target="#myModal"
                    >Login
                    </button>
                    <p className="brief">Login to your account and start sharing</p>
                  </a>
                </div>
                <div>
                  <a href="#signup">
                    <button className="btn btn-success" id="signup">Signup</button>
                    <p className="brief">Register now to enjoy all of More recipes</p>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
        <section id="top-recipes">
          <div className="heading">
            <h3>Welcome to the top recipes of the week</h3>
          </div>
          <div className="card-blocks-home" >
            <LandingRecipeList recipes={this.props.recipeList} />
          </div>
        </section>
        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipeList: state.recipe.recipeList
});

export default connect(mapStateToProps, { getTopRecipes })(Landing);
