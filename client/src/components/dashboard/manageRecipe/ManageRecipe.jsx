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
import ManageRecipeForm from './ManageRecipeForm.jsx';
import renderErrorAlert from '../../../utils/renderErrorAlert';

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
   * @param {int} recipeId
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
    if (
      !this.props.recipe.id
      || this.props.recipe.id === ''
      || !this.recipeId.value
    ) {
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
    if (
      !this.props.recipe.id
      || this.props.recipe.id === ''
      || !this.recipeId.value
    ) {
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
   * render
   *
   * @return {ReactElement} markup
   */
  render() {
    if (this.state.isLoading) {
      return (
        <Loader type="ball-scale-ripple-multiple" active />
      );
    }
    return (
      <div>
        <div className="add-padding">
          <h3><b>Manage Recipe</b></h3>
          <br />
          {
            (this.state.recipes && this.state.recipes.length > 0) ?
              <ManageRecipeForm
                recipeDetail={this.state.recipeDetail}
                ingredients={this.state.ingredients}
                directions={this.state.directions}
                recipes={this.props.userRecipes}
                userRecipes={this.props.userRecipes}
                updateRecipe={this.handleUpdateRecipe}
                deleteRecipe={this.handleDeleteRecipe}
                loadRecipe={this.handleLoadRecipe}
                error={
                  renderErrorAlert(
                    this.state.hasErrored,
                    this.props.errorMessage,
                    this.state.errorMessage, 'black'
                  )
                }
                onChange={this.handleChange}
                onImageChange={this.handleImageChange}
              />
              : <h3 style={{ textAlign: 'center' }}>
                  Sorry! You have not added any recipe
                </h3>
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

export { ManageRecipe as PureManageRecipe };
export default connect(mapStateToProps, {
  fetchUsername,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
  getRecipe,
  uploadImage
})(ManageRecipe);

