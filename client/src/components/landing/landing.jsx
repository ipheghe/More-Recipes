import React from "react";
import { connect } from 'react-redux';
import { MainHeader } from "../../views/index";
import RecipeList from '../recipeList/recipeList';
import { getTopRecipes } from '../../actions/recipe';

class Landing extends React.Component {

  componentDidMount() {
    this.props.getTopRecipes();
  }
  /**
   * @param {component} <MainHeader/> - The landing page main header navigation.
   * @param {component} <Footer/> - The landing page footer navigation.
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
                <br></br>
                <br></br>
                <a href="#top-recipes"><button className="btn btn-success">View top recipes</button></a>
                <p className="arrow-key"><i className="fa fa-arrow-down" aria-hidden="true"></i> <i className="fa fa-arrow-down" aria-hidden="true"></i> <i className="fa fa-arrow-down" aria-hidden="true"></i></p>
              </section>
              <section className="col-md-5 account">
                <div>
                  <a href="#login">
                    <button type="button" className="btn btn-success" id="login" data-toggle="modal" data-target="#myModal">Login</button>
                    <p className="brief">Login to your account and start sharing</p>
                  </a>
                </div>
                <div>
                  <a href="#register">
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
            <RecipeList recipes={this.props.recipes} />
          </div>
        </section>
        <br></br>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipes: state.recipe.recipeData
  };
}

export default connect(mapStateToProps, { getTopRecipes })(Landing);
