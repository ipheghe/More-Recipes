import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  UserNavHeader,
  ProfileHeader,
  UserSection,
  UserNavMenu,
  Footer
} from '../../common';
import RecipeList from '../recipeList/recipeList.jsx';

/**
 * Search component
 * @class Search
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class Search extends React.Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
    searchResult: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  /**
   * @param {any} nextprops
   * @memberOf Search
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.recipe.message) {
      this.setState({
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
                      <h3><b>Search Result</b></h3>
                      <br />
                      <div className="card-blocks" >
                        {
                          (!this.props.searchResult) ?
                          this.props.message : <RecipeList recipes={this.props.searchResult} />
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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.recipe.message,
  searchResult: state.recipe.searchResult
});

export default connect(mapStateToProps)(Search);

