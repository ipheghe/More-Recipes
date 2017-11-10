import React from 'react';
import PropTypes from 'prop-types';
import { UserNavHeader, ProfileHeader, UserSection } from '../../views/index';
import { connect } from 'react-redux';
import RecipeList from '../recipeList/recipeList';


/**
 * Dashboard component
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {

  static propTypes = {
    addCategory: PropTypes.func,
    changePassword: PropTypes.func,
    fetchUsername: PropTypes.func,
    recipes: PropTypes.array,
    errorMessage: PropTypes.string,
    categoryName: PropTypes.string,
    categories: PropTypes.array,
  };

  /**
   * handle login form event error
   * @param {SytheticEvent} e
   * @returns {string} errorMessage
   */
  render() {
    return (
      <div>
        <UserNavHeader />
        <div className="banner-background">
          <div className="profile-background">
            <div className="container">
              <ProfileHeader />
              <br></br>
              <div className="row profile-landing">
                <section className="col-md-3 profile-details">
                  < UserSection />
                </section>
                <section className="col-md-9 profile-tabs" >
                  <div className="div-section">
                    <ul className="nav nav-tabs nav-fill">
                      <li className="nav-item">
                        <a className="nav-link active" href="#dashboard">Top Recipes</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#favorite">Favorites</a>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          href="#"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >My Recipes
                        </a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#myRecipe">Personal Recipes</a>
                          <a className="dropdown-item" href="#manageRecipe">Manage Recipes</a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link " href="#addRecipe">Add Recipe</a>
                      </li>
                    </ul>
                    <br></br>
                    <div className="add-padding">
                      <h3><b>Top Recipes</b></h3>
                      <br></br>
                      <div className="card-blocks" >
                        <RecipeList recipes={this.props.recipes} />
                      </div>
                      <br></br>
                    </div>
                  </div>
                </section>
              </div>
              <div className="profile-pagination">
                <nav aria-label="pagination-nav">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active">
                      <a className="page-link" href="#">2
                        <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  recipes: state.recipe.recipeData
});

export default connect(mapStateToProps)(Dashboard);
