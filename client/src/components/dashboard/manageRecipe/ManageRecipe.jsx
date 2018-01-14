import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import { fetchUsername } from '../../../actions/authActions';
import {
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
  getRecipe
} from '../../../actions/recipeActions';
import { uploadImage } from '../../../actions/uploadImageActions';

/**
 * ManageRecipe component
 *
 * @class ManageRecipe
 *
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
    errorMessage: PropTypes.string,
    userRecipes: PropTypes.arrayOf(PropTypes.object),
    recipe: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      imageUrl: PropTypes.string,
    }).isRequired
  };

  /**
   * constructor
   *
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
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
    this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    this.handleLoadRecipe = this.handleLoadRecipe.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  /**
   * @memberOf ManageRecipe
   *
   * @returns {*} void
   */
  componentDidMount() {
    this.props.getUserRecipes();
  }

  /**
   * @param {any} nextprops
   *
   * @memberOf ManageRecipe
   *
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.userRecipes) {
      const { userRecipes } = nextprops;
      this.setState({
        recipes: Object.assign([], this.state.recipes, userRecipes),
        isLoading: false,
      });
    }
    if (nextprops.state.recipe.recipeData) {
      const { recipeData } = nextprops.state.recipe;
      this.setState({
        recipeDetail: recipeData.description,
        ingredients: recipeData.ingredients,
        directions: recipeData.directions,
        imageUrl: nextprops.imageUrl,
        isLoading: false,
      });
    }
  }

  /**
   * handle change form event
   *
   * @param {SytheticEvent} event
   *
   * @returns {object} state
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handle image change form event
   *
   * @param {SytheticEvent} event
   *
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
   *
   * @param {number} recipeId
   *
   * @returns {*} void
   */
  handleLoadRecipe(recipeId) {
    if (!recipeId || recipeId === '') {
      return this.setState({
        hasErrored: false,
        errorMessage: '',
        recipeDetail: '',
        ingredients: '',
        directions: '',
      });
    }
    this.setState({
      hasErrored: false
    });
    return this.props.getRecipe(recipeId);
  }

  /**
   * handle update recipe event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleUpdateRecipe(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * handle delete recipe event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleDeleteRecipe(event) {
    event.preventDefault();
    if (!this.props.recipe.id || this.props.recipe.id === '' || !this.recipeId.value) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: '',
          recipeDetail: '',
          ingredients: '',
          directions: '',
          imageUrl: '',
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'Please select a recipe'
      });
    }
    this.setState({
      hasErrored: false,
      errorMessage: '',
      recipeDetail: '',
      ingredients: '',
      directions: '',
      imageUrl: '',
    });
    return this.props.deleteRecipe(this.props.recipe.id);
  }

  /**
   * validateFormField
   *
   * @returns {string} errorMessage
   */
  validateFormField() {
    const {
      recipeDetail,
      ingredients,
      directions,
      imageUrl
    } = this.state;
    if (recipeDetail === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'Recipe Detail field cannot be empty'
      });
    }
    if (ingredients === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'ingredients field cannot be empty'
      });
    }
    if (directions === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'directions field cannot be empty'
      });
    }
    if (!this.props.recipe.id || this.props.recipe.id === '' || !this.recipeId.value) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'Please select a recipe'
      });
    }
    return this.props.updateRecipe(
      this.props.recipe.id,
      this.props.recipe.name,
      recipeDetail,
      ingredients,
      directions,
      imageUrl !== '' ? imageUrl : this.props.recipe.imageUrl
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
   *
   * @return {ReactElement} markup
   */
  render() {
    if (this.state.isLoading) return (<Loader type="ball-scale-ripple-multiple" active />);
    return (
      <div>
        <div className="add-padding">
          <h3><b>Manage Recipe</b></h3>
          <br />
          {
            (this.state.recipes && this.state.recipes.length > 0) ?
              <form>
                {this.renderAlert()}
                <div className="form-group">
                  <label htmlFor="recipe-name-list">Select recipe</label>
                  <select
                    type="text"
                    className="form-control"
                    name="recipeId"
                    ref={node => this.recipeId = node}
                    onChange={() => this.handleLoadRecipe(this.recipeId.value)}
                  >
                    <option value="">== Select Recipe ==</option>
                    {
                  (this.state.recipes && this.state.recipes.length > 0) ?
                    this.props.userRecipes.map(userRecipe =>
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
                </div>
                <div className="form-group">
                  <label htmlFor="recipe-detail">Recipe Detail</label>
                  <textarea
                    className="form-control"
                    name="recipeDetail"
                    rows="2"
                    placeholder="Enter Recipe Detail"
                    maxLength="250"
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
                  <button
                    className="btn btn-success"
                    onClick={this.handleUpdateRecipe}
                  >Update Recipe
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.handleDeleteRecipe}
                  >Delete Recipe
                  </button>
                </div>
              </form> : <h3 style={{ textAlign: 'center' }}>Sorry! You have not added any recipe</h3>
          }
        </div>
      </div>
    );
  }
}

ManageRecipe.defaultProps = {
  errorMessage: '',
  userRecipes: []
};

const mapStateToProps = state => ({
  userData: state.auth.userData,
  userRecipes: state.recipe.userRecipes,
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

