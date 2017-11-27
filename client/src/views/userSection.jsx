import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ManageCategoryModal } from './index';
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
    categoryData: PropTypes.arrayOf(PropTypes.object).isRequired,
    errorMessage: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      errorMessage: '',
      modalIsOpen: false
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
   * @param {any} nextProps
   * @memberOf UserSection
   * @returns {*} void
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.state.category.categoryData.length > 0) {
      this.setState({
        modalCategoryName: nextProps.state.category.categoryData[0].name
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
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleAddCategory(e) {
    e.preventDefault();
    this.props.addCategory(this.state.categoryName);
    this.setState({ categoryName: '' });
  }

  /**
   * handle update category form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleUpdateCategory(e) {
    e.preventDefault();
    const categoryId = this.props.categoryData[0].id;
    this.props.updateCategory(categoryId, this.state.modalCategoryName);
    this.setState({ modalIsOpen: false });
  }

  /**
   * handle delete category form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleDeleteCategory(e) {
    e.preventDefault();
    const categoryId = this.props.categoryData[0].id;
    this.props.deleteCategory(categoryId);
    this.setState({ modalIsOpen: false });
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
   * handle change password event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleChangePassword(e) {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state;
    let valid;
    if (!valid) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      if (oldPassword === '') {
        return this.setState({
          hasErrored: true,
          errorMessage: 'old password field cannot be empty'
        });
      }
      if (newPassword === '') {
        return this.setState({
          hasErrored: true,
          errorMessage: 'new password field cannot be empty'
        });
      }
      if (confirmPassword === '') {
        return this.setState({
          hasErrored: true,
          errorMessage: 'confirm password field cannot be empty'
        });
      }
      if (newPassword !== confirmPassword) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'Password mismatch!'
        });
      }
    }
    this.setState({
      hasErrored: false,
      errorMessage: ''
    });
    return this.props.changePassword(this.props.userData.id, oldPassword, newPassword);
  }

  /**
   * handle get category  event
   * @returns {*} void
   */
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  /**
   * handle get category  event
   * @returns {*} void
   */
  closeModal() {
    this.setState({ modalIsOpen: false });
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
          <a href="#editProfile">
            <button className="btn btn-success editProfile-btn">Edit Profile</button>
          </a>
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#myModal"
          >change Password
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
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">Change Password?</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  {this.renderAlert()}
                  <div className="form-group">
                    <label htmlFor="oldPassword">Old Password:</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope" />
                      </span>
                      <input
                        name="oldPassword"
                        type="password"
                        className="form-control"
                        id="oldPassword"
                        onChange={this.handleChange}
                        value={this.state.oldPassword}
                        placeholder="Enter old password"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope" />
                      </span>
                      <input
                        name="newPassword"
                        type="password"
                        className="form-control"
                        id="newPassword"
                        onChange={this.handleChange}
                        value={this.state.newPassword}
                        placeholder="Enter new passoword"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope" />
                      </span>
                      <input
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        onChange={this.handleChange}
                        value={this.state.confirmPassword}
                        placeholder="Confirm new passoword"
                      />
                    </div>
                  </div>
                  {this.state.hasErrored ?
                    <p className="alert error-alert" style={{ color: 'white' }}>
                      <i className="fa fa-exclamation-triangle" />
                      &nbsp;{this.state.errorMessage}
                    </p> : ''
                  }
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.handleChangePassword}
                >Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          this.props.categoryData.length > 0 ?
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
      </main>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.auth.userData,
  categories: state.category.categoryList,
  categoryData: state.category.categoryData,
  errorMessage: state.user.error,
});

export default connect(mapStateToProps, {
  addCategory,
  updateCategory,
  deleteCategory,
  getUserCategories,
  getUserCategory,
  changePassword
})(UserSection);

