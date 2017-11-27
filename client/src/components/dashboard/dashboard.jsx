import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserNavHeader, ProfileHeader, UserSection, UserNavMenu } from '../../views/index';
import RecipeList from '../recipeList/recipeList.jsx';


/**
 * Dashboard component
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
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
                        <RecipeList recipes={this.props.recipes} />
                      </div>
                      <br />
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

const mapStateToProps = state => ({
  userData: state.auth.userData,
  recipes: state.recipe.recipeData
});

export default connect(mapStateToProps)(Dashboard);
