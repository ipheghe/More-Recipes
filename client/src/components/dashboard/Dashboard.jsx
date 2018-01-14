import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {
  ProfileHeader,
  UserSection,
  UserNavMenu,
} from '../../commonViews';
import ConnectedFavorite from './favorite/Favorite.jsx';
import ConnectedAddRecipe from './addRecipe/AddRecipe.jsx';
import ConnectedTopRecipes from './TopRecipes.jsx';
import ConnectedMyRecipes from './MyRecipes.jsx';
import ManageRecipe from './manageRecipe/ManageRecipe.jsx';
import ConnectedSearch from './Search.jsx';


/**
 * Dashboard component
 * @class Dashboard
 * @extends {React.Component}
 */
export class Dashboard extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  /**
   * render
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
                            <ConnectedTopRecipes />
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
                            <ConnectedFavorite />
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
                            <ConnectedAddRecipe />
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
                            <ConnectedMyRecipes />
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
                            <ConnectedSearch />
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

export default connect(mapStateToProps)(Dashboard);
