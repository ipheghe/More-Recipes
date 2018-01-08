import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainHeader, Footer } from '../../common';
import LandingRecipeList from './LandingRecipeList.jsx';
import { getTopRecipesLanding } from '../../actions/recipeActions';

/**
 * Landing page commponent
 *
 * @param {function} onComponentDidMount - callback on ComponentDidMount
 */
export class Landing extends React.Component {
  static propTypes = {
    getTopRecipesLanding: PropTypes.func.isRequired,
    recipeList: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  /**
   * @memberOf Landing
   *
   * @returns {*} void
   */
  componentDidMount() {
    this.props.getTopRecipesLanding();
  }

  /**
   * scrolls down to show top recipes
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  showTopRecipies = (event) => {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: 700
    }, 'slow');
  }

  /**
   * render
   *
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
                <button
                  onClick={this.showTopRecipies}
                  className="btn btn-success"
                  style={{ width: '300px' }}
                >View top recipes
                </button>
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
        <section className="top-recipes" id="top-recipes">
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

export default connect(mapStateToProps, { getTopRecipesLanding })(Landing);
