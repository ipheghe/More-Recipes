import React from "react";
import { UserNavHeader, ProfileHeader, UserSection } from "../../views/index";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsername } from '../../actions/auth';
import { updateRecipe, deleteRecipe, getUserRecipes, getRecipe } from '../../actions/recipe';

@connect((state) => {
  return { state, }
})
class ManageRecipe extends React.Component {
  /**
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: 'coconut',
      recipeDetail: '',
      ingredients: '',
      directions: '',
      recipeImage: '',
      hasErrored: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleLoadRecipe = this.handleLoadRecipe.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsername();
    this.props.getUserRecipes();
  }

  handleChange(e) {
    this.setState({
      recipeName: this.refs.recipeName.value,
      recipeDetail: this.refs.recipeDetail.value,
      ingredients: this.refs.ingredients.value,
      directions: this.refs.directions.value,
      recipeImage: this.refs.recipeImage.value

      //[e.target.name]: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'next')
    this.setState({
      recipeDetail: nextProps.recipe.recipeDescription,
      ingredients: nextProps.recipe.ingredients,
      directions: nextProps.recipe.directions,
    });
  }

  handleLoadRecipe(e) {
    console.log('here', this.props.recipe.recipeName)
    this.props.getRecipe(7);
  }

  handleLogout = (e) => {
    this.props.logoutUser();
  }

  handleUpdateRecipe(e) {
    e.preventDefault();
    console.log('state: ', this.state);
    let { recipeName, recipeDetail, ingredients, directions } = this.state;
    let isRecipeFieldsvalid;
    if (!isRecipeFieldsvalid) {
      if (recipeName === '') {
         this.setState({
          hasErrored: true,
          errorMessage: 'Recipe name field cannot be empty'
        });
      }
      if (recipeDetail === '') {
         this.setState({
          hasErrored: true,
          errorMessage: 'Recipe Detail field cannot be empty'
        });
      }
      if (ingredients === '') {
         this.setState({
          hasErrored: true,
          errorMessage: 'ingredients field cannot be empty'
        });
      }
      if (directions === '') {
         this.setState({
          hasErrored: true,
          errorMessage: 'directions field cannot be empty'
        });
      }
    }
     this.props.updateRecipe(this.props.recipe.id, recipeName, recipeDetail, ingredients, directions);
  }

  handleDeleteRecipe(e) {
     this.props.deleteRecipe(this.props.recipe.id);
  }
  /**
   * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   * @param {component} <Footer/> - The landing page footer navigation.
   */
  render() {
    // console.info('hjnn') 
    const { recipeDetail = '' } = this.props.recipe;
    console.log('in render', this.props.recipe.recipeDescription)
    return (
      <div>
        <UserNavHeader firstName={this.props.userData.firstName} lastName={this.props.userData.lastName} onChange={this.handleLogout} />
        <div className="banner-background">
          <div className="profile-background">
            <div className="container">
              <ProfileHeader />
              <br></br>
              <div className="row profile-landing">
                <section className="col-md-3 profile-details">
                  <UserSection username={this.props.userData.username} />
                </section>
                <section className="col-md-9 profile-tabs" >
                  <div className="div-section">
                    <ul className="nav nav-tabs nav-fill">
                      <li className="nav-item">
                        <a className="nav-link" href="#dashboard">Top Recipes</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#favorite">Favorites</a>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle active" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My Recipes</a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#myRecipe">Personal Recipes</a>
                          <a className="dropdown-item" href="#manageRecipe">Manage Recipes</a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#addRecipe">Add Recipe</a>
                      </li>
                    </ul>
                    <br></br>
                    <div className="add-padding">
                      <h3><b>Manage Recipe</b></h3>
                      <br></br>
                      <form>
                        <div className="form-group">
                          <label for="recipe-name-list">Select recipe</label>
                          <select
                            type="text"
                            className="form-control"
                            ref="recipeName"
                            name="recipeName"
                            value={this.state.recipeName}
                            onChange={this.handleChange}
                          >
                            {
                              (this.props.userRecipe && this.props.userRecipe.length > 0) ?
                                this.props.userRecipe.map((userRecipe, index) => <option value={userRecipe.recipeName} key={index} >{userRecipe.recipeName}</option>)
                                : null
                            }
                          </select>
                          <button type="button" className="btn btn-success" onClick={this.handleLoadRecipe}>Load Recipe Details</button>
                        </div>
                        <div class="form-group">
                          <label for="recipe-detail">Recipe Detail</label>
                          <input
                            type="text"
                            className="form-control"
                            name="recipeDetail"
                            ref="recipeDetail"
                            placeholder="Enter Recipe Detail"
                            value={this.state.recipeDetail}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="form-group">
                          <label for="ingredients">Ingredients</label>
                          <textarea
                            className="form-control"
                            name="ingredients"
                            ref="ingredients"
                            rows="5"
                            value={this.state.ingredients}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label for="directions">Directions</label>
                          <textarea
                            className="form-control"
                            id="directions"
                            ref="directions"
                            rows="10"
                            placeholder={this.props.recipe.directions}
                            value={this.state.directions}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div class="form-group">
                          <label for="recipe-image">Add Image</label>
                          <input
                            type="file"
                            className="form-control-file"
                            name="recipeImage"
                            ref="recipeImage"
                            aria-describedby="fileHelp"
                            value={this.state.recipeImage}
                            onChange={this.handleChange}
                          />
                          <small id="fileHelp" className="form-text text-muted">Please attach an image file.</small>
                        </div>
                        {this.state.hasErrored ?
                          <p className="alert error-alert" style={{ color: 'black' }}>
                            <i className="fa fa-exclamation-triangle"></i>
                            &nbsp;{this.state.errorMessage}
                          </p> : ''
                        }
                        <div className="edit-profile-button">
                          <button type="submit" className="btn btn-success" onClick={this.handleUpdateRecipe}>Update Recipe</button>
                          <button type="submit" className="btn btn-success" onClick={this.handleDeleteRecipe}>Delete Recipe</button>
                        </div>
                      </form>
                    </div>
                    <br></br>
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
function mapStateToProps(state) {
  return {
    userData: state.auth.userData,
    userRecipe: state.recipe.userRecipe,
    recipe: state.recipe.recipeList,
  };
}
export default connect(mapStateToProps, { fetchUsername, updateRecipe, deleteRecipe, getUserRecipes, getRecipe })(ManageRecipe);

