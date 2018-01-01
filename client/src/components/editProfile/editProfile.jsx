import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  UserNavHeader,
  ProfileHeader,
  UserSection,
  Footer
} from '../../common';
import { updateUserRecord } from '../../actions/userActions';

/**
 * EditProfile component
 * @class ViewRecipe
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class EditProfile extends React.Component {
    static propTypes = {
      updateUserRecord: PropTypes.func.isRequired,
      errorMessage: PropTypes.string.isRequired,
      userData: PropTypes.shape({
        id: PropTypes.number
      }).isRequired
    };

  /**
   * constructor
   * @param {object} props
   */
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        fullName: '',
        mobileNumber: 0,
        email: '',
        hasErrored: false,
        errorMessage: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
    }

  /**
   * @param {any} nextprops
   * @memberOf EditProfile
   * @returns {*} void
   */
    componentWillReceiveProps(nextprops) {
      if (nextprops.userData) {
        this.setState({
          username: nextprops.userData.username,
          fullName: nextprops.userData.fullName,
          mobileNumber: nextprops.userData.mobileNumber,
          email: nextprops.userData.email
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
   * handle signUp form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
    handleUpdate(event) {
      event.preventDefault();
      this.validateFormField();
    }

  /**
   * validateFormField
   * @returns {string} errorMessage
   */
    validateFormField() {
      const {
        username, fullName, mobileNumber, email
      } = this.state;
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const numericExpression = /^[0-9]+$/;
      const regExpression = /^[A-Za-z][A-Za-z0-9-]+$/i;
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
      if (!username.match(regExpression)) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'Username must start with a letter and have no spaces.'
        });
      }
      if (fullName.length < 4) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'fullName must contain more than 3 chareacters'
        });
      }
      if (fullName.match(numericExpression)) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'firstName must contain only alphabets'
        });
      }
      if (!mobileNumber.match(numericExpression)) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'mobile number must contain only numbers'
        });
      }
      if (!mobileNumber === '') {
        return this.setState({
          hasErrored: true,
          errorMessage: 'mobile numberfield cannot be empty'
        });
      }
      if (reg.test(email) === false) {
        return this.setState({
          hasErrored: true,
          errorMessage: 'Invalid Email Address'
        });
      }
      this.setState({
        hasErrored: false,
        errorMessage: ''
      });
      return this.props.updateUserRecord(
        username,
        fullName,
        mobileNumber,
        email
      );
    }

  /**
   * handle editProfile form event error
   * @returns {string} errorMessage
   */
    renderAlert() {
      if (this.props.errorMessage) {
        return (
          <div>
            <p className="alert error-alert">
              <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
              {this.props.errorMessage}
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
                    <div className="edit-profile-div-section">
                      <br />
                      <h3><b>Edit Profile</b></h3>
                      <br />
                      {this.renderAlert()}
                      <form className="reg-form" onSubmit={this.handleUpdate}>
                        <div className="form-group">
                          <label htmlFor="enterFirstName">Username:</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                              <i className="fa fa-user" />
                            </span>
                            <input
                              name="username"
                              type="text"
                              className="form-control"
                              id="username"
                              value={this.state.username}
                              onChange={this.handleChange}
                              required
                              formNoValidate
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="enterFirstName">Full Name:</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                              <i className="fa fa-user-o" />
                            </span>
                            <input
                              name="fullName"
                              type="text"
                              className="form-control"
                              id="fullName"
                              value={this.state.fullName}
                              onChange={this.handleChange}
                              required
                              formNoValidate
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="enterMobile">Mobile:</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                              <i className="fa fa-mobile" />
                            </span>
                            <input
                              name="mobileNumber"
                              type="number"
                              className="form-control"
                              id="mobileNumber"
                              value={this.state.mobileNumber}
                              onChange={this.handleChange}
                              required
                              formNoValidate
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="enterEmail">Email address:</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-addon">
                              <i className="fa fa-envelope" />
                            </span>
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="email"
                              value={this.state.email}
                              onChange={this.handleChange}
                              required
                              formNoValidate
                            />
                          </div>
                        </div>
                        <div className="edit-profile-button">
                          <button type="submit" className="btn btn-success" >Update</button>
                          <a href="#dashboard"><button type="button" className="btn btn-danger">Cancel</button></a>
                        </div>
                      </form>
                      {this.state.hasErrored ?
                        <p className="alert error-alert">
                          <i className="fa fa-exclamation-triangle" />
                          {this.state.errorMessage}
                        </p> : ''
                                        }
                      <br />
                    </div>
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
const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  userData: state.auth.userData,
});

export default connect(mapStateToProps, { updateUserRecord })(EditProfile);

