import React from "react";
import { UserNavHeader, ProfileHeader, UserSection } from "../../views/index";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsername } from '../../actions/auth';
import { addRecipe } from '../../actions/recipe';

import {uploadImage} from '../../actions/uploadImage';

@connect((state) => {
  return { state, }
})
class AddRecipe extends React.Component {
  /**
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   */
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeDetail: '',
      ingredients: '',
      directions: '',
      imageUrl: '',
      hasErrored: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchUsername());
  }

  handleChange(e) {
    this.setState({
      recipeName: this.refs.recipeName.value,
      recipeDetail: this.refs.recipeDetail.value,
      ingredients: this.refs.ingredients.value,
      directions: this.refs.directions.value,
    });
  }

  handleImageChange(e) {
    let imageUrl = this.state.imageUrl;
    imageUrl = e.target.files[0];
    this.setState({
      imageUrl
    })
    console.log(imageUrl)
    this.props.uploadImage(imageUrl)
  }

  componentWillReceiveProps(nextprops) {

    console.log(nextprops.imageUrl)
    if (nextprops.imageUrl) {
      console.log('***************');
      this.setState({
        imageUrl: nextprops.imageUrl
      })
    }
  }

  handleAddRecipe(e) {
    e.preventDefault();
    console.log('state: ', this.state);
    let { recipeName, recipeDetail, imageUrl, ingredients, directions } = this.state;
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
      if (imageUrl === '') {
        this.setState({
          hasErrored: true,
          errorMessage: 'Recipe image field cannot be empty'
        });
      }
    }
    this.setState({
      hasErrored: false,
      errorMessage: ''
    });
    console.log(recipeName, "recipeName")
    this.props.addRecipe(recipeName, recipeDetail, imageUrl, ingredients, directions);
  }

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
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My Recipes</a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#myRecipe">Personal Recipes</a>
                          <a className="dropdown-item" href="#manageRecipe">Manage Recipes</a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active " href="#addRecipe">Add Recipe</a>
                      </li>
                    </ul>
                    <br></br>
                    <div className="add-padding">
                      <h3><b> Add Recipe</b></h3>
                      <br></br>
                      <form>
                        <div className="form-group">
                          <label for="recipe-name">Recipe Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipeName"
                            ref="recipeName"
                            aria-describedby="recipeHelp"
                            placeholder="Enter Recipe Name"
                            value={this.state.recipeName}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="recipe-detail">Recipe Detail</label>
                          <input
                            type="text"
                            className="form-control"
                            id="recipeDetail"
                            ref="recipeDetail"
                            placeholder="Enter Recipe Detail"
                            value={this.state.recipeDescription}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="ingredients">Ingredients</label>
                          <textarea
                            className="form-control"
                            id="ingredients"
                            ref="ingredients"
                            rows="5"
                            value={this.state.ingredients}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label for="directions">Directions</label>
                          <textarea
                            className="form-control"
                            id="directions"
                            ref="directions"
                            rows="10"
                            value={this.state.directions}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="recipe-image">Add Image</label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="imageUrl"
                            name="imageUrl"
                            ref="imageUrl"
                            aria-describedby="fileHelp"
                            onChange={this.handleImageChange}
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
                          <button type="submit" className="btn btn-success" onClick={this.handleAddRecipe} >Add Recipe</button>
                        </div>
                      </form>
                    </div>
                    <br></br>
                  </div>
                  <br></br>
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
    imageFile: state.recipe.imageUrl,
    imageUrl: state.imageUploadReducer[0].response
  };
}
export default connect(mapStateToProps, { fetchUsername, addRecipe, uploadImage })(AddRecipe);


