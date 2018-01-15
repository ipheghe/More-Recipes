import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
    recipeList: PropTypes.arrayOf(PropTypes.object).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
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
    if (this.props.isAuthenticated) return (<Redirect to="/dashboard/top-recipes" />);
    return (
      <div>
        <div className="landing-background" id="landing-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-7 headline-home">
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
                  <Link to="/login"className="btn btn-success home" id="login" >Login</Link>
                  <p className="brief">Login to your account and start sharing</p>
                </div>
                <div>
                  <Link to="/signup"className="btn btn-success home" id="signup" >Signup</Link>
                  <p className="brief">Register now to enjoy all of More recipes</p>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
  recipeList: state.recipe.recipeList
});

export default connect(mapStateToProps, { getTopRecipesLanding })(Landing);
