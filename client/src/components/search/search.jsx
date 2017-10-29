import React from 'react';
import { UserNavHeader, ProfileHeader, UserSection } from '../../views/index';
import { getRecipesBySearch } from '../../actions/recipe';
import { connect } from 'react-redux';
import RecipeList from '../recipeList/recipeList';

@connect((state) => {
  return { state, }
})

/**
 * 
 * 
 * @class Search
 * @extends {React.Component}
 * @param {component} <UserNavHeader/> - The landing page user nav header navigation.
 * @param {component} <ProfileHeader/> - The landing page profile header navigation.
 * @param {component} <UserSection/> - The landing page user section navigation.
 */
class Search extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   searchResult: [],
    //   isLoading: true,
    //   message: ''
    // }
  }

  componentDidMount() {
    const search = this.props.location.search; // could be '?foo=bar'
    const paramss = new URLSearchParams(search);
    const params = paramss.get('sort');
    console.log(params, 'hgdgcgdhcjjjsjdnkjskyh,');
    //const { params } = this.props.match.query.sort;
    this.props.getRecipesBySearch(params);
  }

  // componentWillReceiveProps(nextprops) {
  //   console.log("here", nextprops);
  //   if (nextprops.state.recipe.searchResult) {
  //     const { recipeSearch } = nextprops.state.recipe.searchResult;
  //     this.setState({
  //       searchResult: Object.assign({}, this.state.searchResult, recipeSearch),
  //       isLoading: false,
  //     });
  //   }
  //   if (nextprops.state.recipe.message) {
  //     this.setState({
  //       isLoading: false,
  //       message: nextprops.state.recipe.message
  //     });
  //   }
  // }

  /**
   * 
   * 
   * @returns 
   * 
   * @memberOf Search
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
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My Recipes</a>
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
                      <h3><b>Search Result</b></h3>
                      <br></br>
                      <div className="card-blocks" >
                        {
                          (!this.props.searchResult) ?
                          this.props.message : <RecipeList recipes={this.props.searchResult} />
                        }
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
                      <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
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

/**
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
  return {
    searchResult: state.recipe.searchResult,
    message: state.recipe.message
  };
}

export default connect(mapStateToProps, { getRecipesBySearch })(Search);

