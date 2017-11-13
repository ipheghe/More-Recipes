import React from 'react';
import PropTypes from 'prop-types';
import { addCategory, getUserCategories } from './../actions/category';
import { changePassword } from './../actions/userActions';
import { fetchUsername } from '../actions/auth';
import { connect } from 'react-redux';

/**
 * UserSection component
 * @class UserSection
 * @extends {React.Component}
 */
@connect(state => state)
class UserSection extends React.Component {

  static propTypes = {
    addCategory: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    fetchUsername: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      categories: [],
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      hasErrored: false,
      errorMessage: '',
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
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
   * handle add category form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleAddCategory(e) {
    e.preventDefault();
    this.props.addCategory(this.state.categoryName);
    this.props.fetchUsername();
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
          errorMessage: 'old password field cannot be  empty'
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
            &nbsp;{this.state.errorMessage}</p>
        </div>
      );
    } else if (this.props.errorMessage) {
      return (
        <div>
          <p className="alert error-alert">
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.props.errorMessage}</p>
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
      <main>
        <div className="div-profile">
          <h5>{this.props.userData.username}</h5>
          <h6>@andela</h6>
          <p>
            <span>
              <i className="fa fa-circle" aria-hidden="true" style={{ color: 'green' }}></i>
            </span>Online
          </p>
          <br></br>
          <br></br>
          <a href="#editProfile">
            <button className="btn btn-success editProfile-btn">Edit Profile</button></a>
          <a data-toggle="modal" data-target="#myModal">
            <button className="btn btn-success">change Password</button>
          </a>
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
          <br></br>
          <div className="profile-category-button">
            <button
              type="button"
              className="btn btn-default btn-sm"
            >
              {this.props.categoryName}
              <span className="badge text-right">7</span>
            </button>
            {
              (this.props.categories && this.props.categories.length > 0) ?
                this.props.categories.map((category, index) =>
                  <button
                    type="button"
                    className="btn btn-default btn-sm"
                    key={index}
                  >
                    {category.name}
                    <span className="badge text-right">7</span>
                  </button>)
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
                      <i className="fa fa-exclamation-triangle"></i>
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
      </main>
    );
  }
}
const mapStateToProps = state => ({
  userData: state.auth.userData,
  categories: state.category.categoryList,
  categoryName: state.category.categoryName,
  errorMessage: state.user.error,
});

export default connect(mapStateToProps, {
  fetchUsername,
  addCategory,
  getUserCategories,
  changePassword
})(UserSection);

