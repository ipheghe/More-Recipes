import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipe } from '../../../actions/recipeActions';
import { uploadImage } from '../../../actions/uploadImageActions';
import AddRecipeForm from './AddRecipeForm.jsx';
import addRecipeValidator from '../../../utils/validator/addRecipeValidator';
import renderErrorAlert from '../../../utils/renderErrorAlert';

/**
 * AddRecipe component
 *
 * @class AddRecipe
 *
 * @extends {React.Component}
 */
class AddRecipe extends React.Component {
  static propTypes = {
    addRecipe: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  };

  /**
   * constructor
   *
   * @param {object} props
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

  /**
   * @param {any} nextprops
   *
   * @memberOf AddRecipe
   *
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.imageUrl) {
      this.setState({
        imageUrl: nextprops.imageUrl
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
   * handle add recipe form event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleAddRecipe(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * validateFormField
   *
   * @returns {string} errorMessage
   */
  validateFormField() {
    const {
      recipeName,
      recipeDetail,
      ingredients,
      directions,
      imageUrl
    } = this.state;

    const error = addRecipeValidator(
      recipeName,
      recipeDetail,
      ingredients,
      directions,
      imageUrl
    );

    if (error.status === true) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: error.status,
        errorMessage: error.message
      });
    }

    return this.props.addRecipe(
      recipeName,
      recipeDetail,
      imageUrl,
      ingredients,
      directions
    );
  }

  /**
   * render
   *
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
        <div className="add-padding">
          <h3><b> Add Recipe</b></h3>
          <br />
          <AddRecipeForm
            recipeName={this.state.recipeName}
            recipeDetail={this.state.recipeDetail}
            ingredients={this.state.ingredients}
            directions={this.state.directions}
            addRecipe={this.handleAddRecipe}
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
        </div>
      </div>
    );
  }
}

AddRecipe.defaultProps = {
  errorMessage: ''
};

const mapStateToProps = state => ({
  errorMessage: state.recipe.error,
  imageFile: state.recipe.imageUrl,
  imageUrl: state.imageUploadReducer[0].response
});

export { AddRecipe as PureAddRecipe };
export default connect(mapStateToProps, { addRecipe, uploadImage })(AddRecipe);

