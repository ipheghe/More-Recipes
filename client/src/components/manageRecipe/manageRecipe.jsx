import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserNavHeader, ProfileHeader, UserSection, UserNavMenu } from '../../views/index';
import { fetchUsername } from '../../actions/auth';
import { updateRecipe, deleteRecipe, getUserRecipes, getRecipe } from '../../actions/recipe';
import { uploadImage } from '../../actions/uploadImage';

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
    userRecipe: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      imageUrl: '',
      hasErrored: false,
      errorMessage: '',
      isLoading: true
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
      const { userRecipe } = nextprops.state.recipe;
      this.setState({
        recipes: Object.assign([], this.state.recipes, userRecipe),
        isLoading: false,
      });
    }
    if (nextprops.state.recipe.recipeList) {
      const { recipeList } = nextprops.state.recipe;
      this.setState({
        recipeDetail: recipeList.recipeDescription,
        ingredients: recipeList.ingredients,
        directions: recipeList.directions,
        imageUrl: nextprops.imageUrl,
        isLoading: false,
      });
    }
  }

  /**
   * handle change form event
   * @param {SytheticEvent} e
   * @returns {object} state
   */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * handle image change form event
   * @param {SytheticEvent} e
   * @returns {object} state
   */
  handleImageChange(e) {
    const imageUrl = e.target.files[0];
    this.setState({
      imageUrl
    });
    this.props.uploadImage(imageUrl);
  }

  /**
   * handle load recipe event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleLoadRecipe(e) {
    e.preventDefault();
    this.props.getRecipe(this.userRecipeId.value);
  }

  /**
   * handle update recipe event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleUpdateRecipe(e) {
    e.preventDefault();
    const {
      recipeDetail,
      ingredients,
      directions,
      imageUrl
    } = this.state;
    const isRecipeFieldsvalid = false;
    if (isRecipeFieldsvalid) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
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
   * handle delete recipe event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleDeleteRecipe(e) {
    e.preventDefault();
    this.props.deleteRecipe(this.props.recipe.id);
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
                            name="recipeName"
                          >
                            {
                              (this.state.recipes && this.state.recipes.length > 0) ?
                                this.state.recipes.map(userRecipe =>
                                  (
                                    <option
                                      name="recipeNamme"
                                      value={userRecipe.id}
                                      ref={node => this.userRecipeId = node}
                                      key={userRecipe.id}
                                    >{userRecipe.recipeName}
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
                          <button type="submit" className="btn btn-success" onClick={this.handleDeleteRecipe}>Delete Recipe</button>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  userRecipe: state.recipe.userRecipe,
  recipe: state.recipe.recipeList,
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

