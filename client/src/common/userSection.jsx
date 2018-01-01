import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ManageCategoryModal, ChangePasswordModal } from './index';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getUserCategories,
  getUserCategory
} from './../actions/categoryActions';
import { changePassword } from './../actions/userActions';

/**
 * UserSection component
 * @class UserSection
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class UserSection extends React.Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    getUserCategory: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
    categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
    status: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object)
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      modalCategoryName: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      hasErrored: false,
      status: '',
      errorMessage: '',
      modalIsOpen: false,
      passwordModalIsOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * @param {any} nextprops
   * @memberOf UserSection
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.category.userCategoryList.length > 0) {
      this.setState({
        modalCategoryName: nextprops.state.category.userCategoryList[0].name
      });
    }
    if (nextprops.state.user.status.length > 0) {
      this.setState({
        status: nextprops.state.user.status
      });
    }
  }

  /**
   * handle get category  event
   * @param {number} categoryId
   * @returns {*} void
   */
  getCategory(categoryId) {
    this.props.getUserCategory(categoryId);
    this.setState({ modalIsOpen: true });
  }

  /**
   * handle add category form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleAddCategory(event) {
    event.preventDefault();
    this.props.addCategory(this.state.categoryName);
    this.setState({ categoryName: '' });
  }

  /**
   * handle update category form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleUpdateCategory(event) {
    event.preventDefault();
    const categoryId = this.props.categoryList[0].id;
    this.props.updateCategory(categoryId, this.state.modalCategoryName);
    this.setState({ modalIsOpen: false });
  }

  /**
   * handle delete category form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleDeleteCategory(event) {
    event.preventDefault();
    const categoryId = this.props.categoryList[0].id;
    this.props.deleteCategory(categoryId);
    this.setState({ modalIsOpen: false });
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
   * handle change password event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleChangePassword(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * handle after open modal event
   * @returns {*} void
   */
  afterOpenModal() {
    this.subtitle.style.color = '#252A2D';
  }

  /**
   * handle close modal event
   * @returns {*} void
   */
  closeModal() {
    this.setState({
      modalIsOpen: false,
      passwordModalIsOpen: false,
      status: ''
    });
  }

  /**
   * validateFormField
   * @returns {string} errorMessage
   */
  validateFormField() {
    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.state;
    if (oldPassword === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'old password field cannot be empty'
      });
    }
    if (newPassword === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'new password field cannot be empty'
      });
    }
    if (confirmPassword === '') {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'confirm password field cannot be empty'
      });
    }
    if (newPassword !== confirmPassword) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      return this.setState({
        hasErrored: true,
        errorMessage: 'Password mismatch!'
      });
    }
    return this.props.changePassword(oldPassword, newPassword);
  }

  /**
   * handle form event error
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
    const customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    return (
      <main>
        <div className="div-profile">
          <h5>@{this.props.userData.username}</h5>
          <p>
            <span>
              <i className="fa fa-circle" aria-hidden="true" style={{ color: 'green' }} />
            </span>Online
          </p>
          <br />
          <br />
          <button
            className="invisible-button"
            style={{ color: '#0275d8', textAlign: 'center' }}
            onClick={() => {
              window.location.hash = 'editProfile';
          }}
          >
          Edit Profile
          </button>
          <button
            className="invisible-button"
            style={{ color: '#0275d8', textAlign: 'center' }}
            onClick={() => {
              this.setState({
                passwordModalIsOpen: true,
                status: ''
              });
            }}
          >
          Change Password
          </button>
        </div>
        <br />
        <div className="div-profile">
          <h5>Add Category</h5>
          <div className="form-group profile-form">
            <input
              type="text"
              className="form-control"
              name="categoryName"
              id="category-name"
              placeholder="Enter Name"
              onChange={this.handleChange}
              value={this.state.categoryName}
            />
          </div>
          <div>
            <button
              type="button"
              className="btn btn-success"
              onClick={this.handleAddCategory}
            >Add
            </button>
          </div>
          <br />
          <div className="profile-category-button">
            {
              (this.props.categories && this.props.categories.length > 0) ?
              this.props.categories.map(category =>
                  (
                    <button
                      type="button"
                      className="btn btn-default btn-sm"
                      name="categoryModalName"
                      key={category.id}
                      value={category.id}
                      ref={node => this.categoryInput = node}
                      onClick={() => this.getCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))
                : null
            }
          </div>
        </div>
        {
          this.props.categoryList.length > 0 ?
            <ManageCategoryModal
              isOpen={this.state.modalIsOpen}
              afterOpen={this.afterOpenModal}
              onClose={this.closeModal}
              closeModal={this.closeModal}
              customStyles={customStyles}
              value={this.state.modalCategoryName}
              onChange={this.handleChange}
              onUpdate={this.handleUpdateCategory}
              onDelete={this.handleDeleteCategory}
              refName={subtitle => this.subtitle = subtitle}
            /> : ''
        }
        {
          this.state.status === '' || this.state.status === 'Fail' ?
            <div>
              <ChangePasswordModal
                error={this.renderAlert()}
                isOpen={this.state.passwordModalIsOpen}
                onClose={this.closeModal}
                closeModal={this.closeModal}
                customStyles={customStyles}
                oldPasswordValue={this.state.oldPassword}
                newPasswordValue={this.state.newPassword}
                confirmPasswordValue={this.state.confirmPassword}
                onChange={this.handleChange}
                onUpdate={this.handleChangePassword}
                errorMessage={this.state.errorMessage}
              />
            </div> : ''
        }
      </main>
    );
  }
}

UserSection.defaultProps = {
  categories: []
};

const mapStateToProps = state => ({
  userData: state.auth.userData,
  categories: state.category.categoryList,
  categoryList: state.category.userCategoryList,
  errorMessage: state.user.error,
  status: state.user.status
});

export default connect(mapStateToProps, {
  addCategory,
  updateCategory,
  deleteCategory,
  getUserCategories,
  getUserCategory,
  changePassword
})(UserSection);

