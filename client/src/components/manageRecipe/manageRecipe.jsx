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
import { fetchUsername } from '../../actions/authActions';
import {
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
  getRecipe
} from '../../actions/recipeActions';
import { uploadImage } from '../../actions/uploadImageActions';

/**
 * ManageRecipe component
 * @class ManageRecipe
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class ManageRecipe extends React.Component {
  static propTypes = {
    getUserRecipes: PropTypes.func.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    getRecipe: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    recipe: PropTypes.shape({
      id: PropTypes.number,
      recipeName: PropTypes.string,
    }).isRequired
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      recipeDetail: '',
      ingredients: '',
      directions: '',
      recipeId: '',
      imageUrl: '',
      hasErrored: false,
      errorMessage: '',
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleLoadRecipe = this.handleLoadRecipe.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  /**
   * @memberOf MyRecipe
   * @returns {*} void
   */
  componentDidMount() {
    this.props.getUserRecipes();
  }

  /**
   * @param {any} nextprops
   * @memberOf MyRecipe
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.recipe) {
      const { userRecipes } = nextprops.state.recipe;
      this.setState({
        recipes: Object.assign([], this.state.recipes, userRecipes),
        isLoading: false,
      });
    }
    if (nextprops.state.recipe.recipeData) {
      const { recipeData } = nextprops.state.recipe;
      this.setState({
        recipeDetail: recipeData.recipeDescription,
        ingredients: recipeData.ingredients,
        directions: recipeData.directions,
        imageUrl: nextprops.imageUrl,
        isLoading: false,
      });
    }
  }

  /**
   * handle change form event
   * @param {SytheticEvent} event
   * @returns {object} state
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handle image change form event
   * @param {SytheticEvent} event
   * @returns {object} state
   */
  handleImageChange(event) {
    const imageUrl = event.target.files[0];
    this.setState({
      imageUrl
    });
    this.props.uploadImage(imageUrl);
  }

  /**
   * handle load recipe event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleLoadRecipe(event) {
    event.preventDefault();
    this.props.getRecipe(this.state.recipeId);
  }

  /**
   * handle update recipe event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleUpdateRecipe(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * handle delete recipe event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleDeleteRecipe(event) {
    event.preventDefault();
    this.props.deleteRecipe(this.props.recipe.id);
  }

  /**
   * validateFormField
   * @returns {string} errorMessage
   */
  validateFormField() {
    const {
      recipeDetail,
      ingredients,
      directions,
      imageUrl,
      hasErrored
    } = this.state;
    if (recipeDetail === '') {
      return this.setState({
        hasErrored: true,
        errorMessage: 'Recipe Detail field cannot be empty'
      });
    }
    if (ingredients === '') {
      return this.setState({
        hasErrored: true,
        errorMessage: 'ingredients field cannot be empty'
      });
    }
    if (directions === '') {
      return this.setState({
        hasErrored: true,
        errorMessage: 'directions field cannot be empty'
      });
    }
    if (imageUrl === '') {
      return this.setState({
        hasErrored: true,
        errorMessage: 'Recipe image field cannot be empty'
      });
    }
    if (hasErrored === true) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
    }
    this.setState({
      recipeDetail: '',
      ingredients: '',
      directions: '',
      imageUrl: ''
    });
    return this.props.updateRecipe(
      this.props.recipe.id,
      this.props.recipe.recipeName,
      recipeDetail,
      ingredients,
      directions,
      imageUrl
    );
  }

  /**
   * handle recipe form event error
   * @param {SytheticEvent} e
   * @returns {string} errorMessage
   */
  renderAlert() {
    if (this.state.hasErrored) {
      return (
        <div>
          <p className="alert error-alert">
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.state.errorMessage}
          </p>
        </div>
      );
    } else if (this.props.errorMessage) {
      return (
        <div>
          <p className="alert error-alert">
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.props.errorMessage}
          </p>
        </div>
      );
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
                      <h3><b>Manage Recipe</b></h3>
                      <br />
                      <form>
                        {this.renderAlert()}
                        <div className="form-group">
                          <label htmlFor="recipe-name-list">Select recipe</label>
                          <select
                            type="text"
                            className="form-control"
                            name="recipeId"
                            onChange={this.handleChange}
                          >
                            {
                              (this.state.recipes && this.state.recipes.length > 0) ?
                                this.state.recipes.map(userRecipe =>
                                  (
                                    <option
                                      name="recipeId"
                                      value={userRecipe.id}
                                      key={userRecipe.id}
                                    >{userRecipe.name}
                                    </option>
                                  ))
                                : null
                            }
                          </select>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={this.handleLoadRecipe}
                          >Load Recipe Details
                          </button>
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipe-detail">Recipe Detail</label>
                          <textarea
                            className="form-control"
                            name="recipeDetail"
                            rows="2"
                            placeholder="Enter Recipe Detail"
                            value={this.state.recipeDetail}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="ingredients">Ingredients</label>
                          <textarea
                            className="form-control"
                            name="ingredients"
                            rows="5"
                            placeholder="Enter recipe ingredients separated by a comma"
                            value={this.state.ingredients}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="directions">Directions</label>
                          <textarea
                            className="form-control"
                            id="directions"
                            rows="10"
                            placeholder="Enter recipe directions separated by a comma"
                            value={this.state.directions}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipe-image">Add Image</label>
                          <input
                            type="file"
                            className="form-control-file"
                            id="imageUrl"
                            name="imageUrl"
                            aria-describedby="fileHelp"
                            onChange={this.handleImageChange}
                          />
                          <small id="fileHelp" className="form-text text-muted">Please attach an image file.</small>
                        </div>
                        <div className="edit-profile-button">
                          <button type="submit" className="btn btn-success" onClick={this.handleUpdateRecipe}>Update Recipe</button>
                          <button type="submit" className="btn btn-danger" onClick={this.handleDeleteRecipe}>Delete Recipe</button>
                        </div>
                      </form>
                    </div>
                    <br />
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
  userData: state.auth.userData,
  userRecipe: state.recipe.userRecipe,
  recipe: state.recipe.recipeData,
  errorMessage: state.recipe.error,
  imageFile: state.recipe.imageUrl,
  imageUrl: state.imageUploadReducer[0].response
});
export default connect(mapStateToProps, {
  fetchUsername,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
  getRecipe,
  uploadImage
})(ManageRecipe);

