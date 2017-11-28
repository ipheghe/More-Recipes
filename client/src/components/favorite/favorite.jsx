import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserNavHeader, ProfileHeader, UserSection, UserNavMenu } from '../../views/index';
import { getFavoriteRecipes } from '../../actions/favorite';
import FavoriteRecipeList from '../favoriteRecipeList/favoriteRecipeList.jsx';

/**
 * Favorite component
 * @class Favorite
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class Favorite extends React.Component {
  static propTypes = {
    getFavoriteRecipes: PropTypes.func.isRequired,
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      userFavorites: [],
      message: '',
      isLoading: true
    };
  }

  /**
   * @memberOf Favorite
   * @returns {*} void
   */
  componentDidMount() {
    this.props.getFavoriteRecipes();
  }

  /**
   * @param {any} nextprops
   * @memberOf Favorite
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.favorite) {
      const { userFavorites } = nextprops.state.favorite;
      this.setState({
        userFavorites: Object.assign([], this.state.userFavorites, userFavorites),
        message: nextprops.state.favorite.message,
        isLoading: false
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
                      <h3><b>Favorite Recipes</b></h3>
                      <br />
                      <div className="card-blocks" >
                        {
                          this.state.userFavorites.length === 0 ?
                            (<h5>{this.state.message}</h5>)
                            : <FavoriteRecipeList recipes={this.state.userFavorites} />
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
  userFavorites: state.favorite.userFavorites,
  message: state.favorite.message
});

export default connect(mapStateToProps, { getFavoriteRecipes })(Favorite);

