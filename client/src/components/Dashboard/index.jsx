import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {
  ProfileHeader,
  UserSection,
  UserNavMenu,
} from '../../commonViews';
import Favorite from './Favorite';
import AddRecipe from './AddRecipe';
import TopRecipes from './TopRecipes';
import MyRecipes from './MyRecipes';
import ManageRecipe from './ManageRecipe';
import Search from './Search';


/**
 * Dashboard component
 *
 * @class Dashboard
 *
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  /**
   * render
   *
   * @return {ReactElement} markup
   */
  render() {
    const auth = this.props.isAuthenticated;
    return (
      <div>
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
                    <div>
                      <Route
                        exact
                        path="/dashboard/top-recipes"
                        render={() => (
                          !auth ? (
                            <Redirect to="/login" />
                          ) : (
                            <TopRecipes />
                          )
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/favorites"
                        render={() => (
                          !auth ? (
                            <Redirect to="/login" />
                          ) : (
                            <Favorite />
                          )
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/add-recipe"
                        render={() => (
                          !auth ? (
                            <Redirect to="/login" />
                          ) : (
                            <AddRecipe />
                          )
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/my-recipes"
                        render={() => (
                          !auth ? (
                            <Redirect to="/login" />
                          ) : (
                            <MyRecipes />
                          )
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/manage-recipes"
                        render={() => (
                          !auth ? (
                            <Redirect to="/login" />
                          ) : (
                            <ManageRecipe />
                          )
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/search"
                        render={() => (
                          !auth ? (
                            <Redirect to="/login" />
                          ) : (
                            <Search />
                          )
                        )}
                      />
                      <Route
                        exact
                        path="/dashboard/"
                        render={() => (<Redirect to="/*" />)}
                      />
                      <Route
                        exact
                        path="/dashboard/top-recipes/*"
                        render={() => (<Redirect to="/*" />)}
                      />
                      <Route
                        exact
                        path="/dashboard/favorites/*"
                        render={() => (<Redirect to="/*" />)}
                      />
                      <Route
                        exact
                        path="/dashboard/manage-recipes/*"
                        render={() => (<Redirect to="/*" />)}
                      />
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
  isAuthenticated: state.auth.authenticated
});

export { Dashboard as PureDashboard };
export default connect(mapStateToProps)(Dashboard);
