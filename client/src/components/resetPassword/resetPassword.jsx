import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ResetPasswordHeader, Footer } from '../../actions';
import { verifyTokenPassword } from '../../actions/userActions';

/**
 * Reset password form commponent
 * @class ResetPassword
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {
  static propTypes = {
    verifyTokenPassword: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      hasErrored: false,
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  /**
   * handle change form event
   * @param {SytheticEvent} event
   * @returns {object} state
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handle resetPassword form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleResetPassword(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * validateFormField
   * @returns {string} errorMessage
   */
  validateFormField() {
    const { newPassword, confirmPassword, hasErrored } = this.state;
    const { token } = this.props.match.params;
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
    if (hasErrored === true) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
    }
    this.setState({
      newPassword: '',
      confirmPassword: '',
      hasErrored: false,
      errorMessage: ''
    });
    return this.props.verifyTokenPassword(newPassword, token);
  }

  /**
   * handle resetPassword form event error
   * @returns {string} errorMessage
   */
  renderAlert() {
    if (this.state.hasErrored) {
      return (
        <div>
          <p className="alert error-alert" style={{ color: 'white' }}>
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }} />
            &nbsp;{this.state.errorMessage}
          </p>
        </div>
      );
    } else if (this.props.errorMessage) {
      return (
        <div>
          <p className="alert error-alert" style={{ color: 'white' }}>
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
        <ResetPasswordHeader />
        <div className="login-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-7 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br />
                <br />
                <h2><em><i>Please input your new password</i></em></h2>
              </section>
              <section className="col-md-5 account">
                <div>
                  <form className="login-form">
                    {this.renderAlert()}
                    <h3 className="login-form-boxx">Update Password</h3>
                    <br />
                    <div className="form-group">
                      <label htmlFor="enterPassword">New Password:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-unlock-alt" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          placeholder="Enter new password"
                          value={this.state.newPassword}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="enterPassword">Confirm Password:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-unlock-alt" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={this.state.confirmPassword}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="login-buttons">
                      <div>
                        <a href="#dashboard">
                          <button
                            type="submit"
                            className="btn btn-block btn-success"
                            onClick={this.handleResetPassword}
                          >Change Password
                          </button>
                        </a>
                      </div>
                      <br />
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessages: state.user.error
});

export default connect(mapStateToProps, { verifyTokenPassword })(ResetPassword);

