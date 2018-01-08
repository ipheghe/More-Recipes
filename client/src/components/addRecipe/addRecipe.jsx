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
import AddRecipeForm from './AddRecipeForm.jsx';

/**
 * AddRecipe component
 *
 * @class AddRecipe
 *
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
    if (recipeName === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'Recipe name field cannot be empty'
      });
    }
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
    if (imageUrl === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'Recipe image field cannot be empty'
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
   * handle login form event error
   *
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
                      <AddRecipeForm
                        recipeName={this.state.recipeName}
                        recipeDetail={this.state.recipeDetail}
                        ingredients={this.state.ingredients}
                        directions={this.state.directions}
                        addRecipe={this.handleAddRecipe}
                        error={this.renderAlert()}
                        onChange={this.handleChange}
                        onImageChange={this.handleImageChange}
                      />
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

