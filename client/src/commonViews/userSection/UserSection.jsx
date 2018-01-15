import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ManageCategoryModal, ChangePasswordModal } from '../index';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getUserCategory
} from '../../actions/categoryActions';
import { changePassword } from '../../actions/userActions';
import renderErrorAlert from '../../utils/errorAlert';
import validateChangePasswordField from '../../utils/validator/changePasswordValidator';
import { logoutUser } from '../../actions/authActions';

/**
 * UserSection component
 *
 * @class UserSection
 *
 * @extends {React.Component}
 */
export class UserSection extends React.Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    getUserCategory: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    modalOpen: PropTypes.func,
    modalClosed: PropTypes.func,
    userData: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
    categoryList: PropTypes.arrayOf(PropTypes.object).isRequired,
    errorMessage: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.object)
  };

  /**
   * constructor
   *
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
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * @param {any} nextprops
   *
   * @memberOf UserSection
   *
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.categoryList.length > 0) {
      this.setState({
        modalCategoryName: nextprops.categoryList[0].name
      });
    }
    if (nextprops.status.length > 0) {
      this.setState({
        status: nextprops.status
      });
    }
    if (nextprops.status === 'Success') {
      nextprops.logoutUser();
    }
  }

  /**
   * handle get category  event
   *
   * @param {number} categoryId
   *
   * @returns {*} void
   */
  getCategory(categoryId) {
    this.props.getUserCategory(categoryId);
    this.props.modalOpen();
    this.setState({ modalIsOpen: true });
  }

  /**
   * handle add category form event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleAddCategory(event) {
    event.preventDefault();
    this.props.addCategory(this.state.categoryName);
    this.setState({ categoryName: '' });
  }

  /**
   * handle update category form event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleUpdateCategory(event) {
    event.preventDefault();
    this.props.modalClosed();
    const categoryId = this.props.categoryList[0].id;
    this.props.updateCategory(categoryId, this.state.modalCategoryName);
    this.setState({ modalIsOpen: false });
  }

  /**
   * handle delete category form event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleDeleteCategory(event) {
    event.preventDefault();
    this.props.modalClosed();
    const categoryId = this.props.categoryList[0].id;
    this.props.deleteCategory(categoryId);
    this.setState({ modalIsOpen: false });
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
   * handle change password event
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleChangePassword(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * handle close modal function
   *
   * @returns {*} void
   */
  closeModal() {
    this.props.modalClosed();
    this.setState({
      modalIsOpen: false,
      passwordModalIsOpen: false,
      status: ''
    });
  }

  /**
   * validateFormField
   *
   * @returns {string} errorMessage
   */
  validateFormField() {
    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.state;

    const error = validateChangePasswordField(
      oldPassword,
      newPassword,
      confirmPassword,
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
    return this.props.changePassword(oldPassword, newPassword);
  }

  /**
   * render
   *
   * @return {ReactElement} markup
   */
  render() {
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
            className="invisible-button nav-editProfile"
            style={{ color: '#0275d8', textAlign: 'center' }}
            onClick={() => {
              window.location.hash = 'editProfile';
          }}
          >
          Edit Profile
          </button>
          <button
            className="invisible-button nav-changePassword"
            style={{ color: '#0275d8', textAlign: 'center' }}
            onClick={() => {
              this.props.modalOpen();
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
              onClose={this.closeModal}
              closeModal={this.closeModal}
              value={this.state.modalCategoryName}
              onChange={this.handleChange}
              onUpdate={this.handleUpdateCategory}
              onDelete={this.handleDeleteCategory}
            /> : ''
        }
        {
          this.state.status === '' || this.state.status === 'Fail' ?
            <div>
              <ChangePasswordModal
                error={
                    renderErrorAlert(this.state.hasErrored, this.props.errorMessage, this.state.errorMessage, 'white')
                  }
                isOpen={this.state.passwordModalIsOpen}
                onClose={this.closeModal}
                closeModal={this.closeModal}
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
  categories: [],
  errorMessage: '',
  modalOpen: () => {},
  modalClosed: () => {}
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
  getUserCategory,
  changePassword,
  logoutUser
})(UserSection);

