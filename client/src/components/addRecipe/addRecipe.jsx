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
import { addRecipe } from '../../actions/recipeActions';
import { uploadImage } from '../../actions/uploadImageActions';

/**
 * AddRecipe component
 * @class AddRecipe
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class AddRecipe extends React.Component {
  static propTypes = {
    addRecipe: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  };

  /**
   * constructor
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
   * @memberOf UserNavHeader
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
   * handle add recipe form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleAddRecipe(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * validateFormField
   * @returns {string} errorMessage
   */
  validateFormField() {
    const {
      recipeName,
      recipeDetail,
      ingredients,
      directions,
      imageUrl,
      hasErrored
    } = this.state;
    if (recipeName === '') {
      return this.setState({
        hasErrored: true,
        errorMessage: 'Recipe name field cannot be empty'
      });
    }
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
      hasErrored: false,
      errorMessage: ''
    });
    return this.props.addRecipe(
      recipeName,
      recipeDetail,
      imageUrl,
      ingredients,
      directions
    );
  }

  /**
   * handle login form event error
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
                      <h3><b> Add Recipe</b></h3>
                      <br />
                      <form>
                        {this.renderAlert()}
                        <div className="form-group">
                          <label htmlFor="recipe-name">Recipe Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="recipeName"
                            aria-describedby="recipeHelp"
                            placeholder="Enter Recipe Name"
                            value={this.state.recipeName}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="recipe-detail">Recipe Detail</label>
                          <input
                            type="text"
                            className="form-control"
                            name="recipeDetail"
                            placeholder="Enter Recipe Detail"
                            maxLength="250"
                            value={this.state.recipeDescription}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="ingredients">Ingredients</label>
                          <textarea
                            className="form-control"
                            name="ingredients"
                            rows="5"
                            value={this.state.ingredients}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="directions">Directions</label>
                          <textarea
                            className="form-control"
                            name="directions"
                            rows="10"
                            value={this.state.directions}
                            onChange={this.handleChange}
                            required
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
                            type="submit"
                            className="btn btn-success"
                            onClick={this.handleAddRecipe}
                          >Add Recipe
                          </button>
                        </div>
                      </form>
                    </div>
                    <br />
                  </div>
                  <br />
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

AddRecipe.defaultProps = {
  errorMessage: ''
};

const mapStateToProps = state => ({
  errorMessage: state.recipe.error,
  imageFile: state.recipe.imageUrl,
  imageUrl: state.imageUploadReducer[0].response
});
export default connect(mapStateToProps, { addRecipe, uploadImage })(AddRecipe);

