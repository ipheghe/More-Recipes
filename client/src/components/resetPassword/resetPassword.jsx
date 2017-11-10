import React from 'react';
import { ResetPasswordHeader } from '../../views/index';
import { connect } from 'react-redux';
import { verifyTokenPassword } from '../../actions/userActions';
import PropTypes from 'prop-types';

/**
 * Reset password form commponent
 * @class ResetPassword
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    verifyTokenPassword: PropTypes.func,
    errorMessage: PropTypes.string,
    match: PropTypes.object
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
   * @param {SytheticEvent} e
   * @returns {object} state
   */
  handleChange(e) {
    e.preventDefault();
    this.setState({
      newPassword: this.refs.newPassword.value,
      confirmPassword: this.refs.confirmPassword.value
    });
  }

  /**
   * handle resetPassword form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleResetPassword(e) {
    e.preventDefault();
    const { newPassword, confirmPassword } = this.state;
    const { token } = this.props.match.params;
    let valid;
    if (!valid) {
      setTimeout(() => {
        this.setState({
          hasErrored: false,
          errorMessage: ''
        });
      }, 3000);
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
      newPassword: '',
      confirmPassword: '',
      hasErrored: false,
      errorMessage: ''
    });
    return this.props.verifyTokenPassword(newPassword, token);
  }

  /**
   * handle resetPassword form event error
   * @param {SytheticEvent} e
   * @returns {string} errorMessage
   */
  renderAlert() {
    if (this.state.hasErrored) {
      return (
        <div>
          <p className="alert error-alert" style={{ color: 'white' }}>
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }}></i>
            &nbsp;{this.state.errorMessage}</p>
        </div>
      );
    } else if (this.props.errorMessage) {
      return (
        <div>
          <p className="alert error-alert" style={{ color: 'white' }}>
            <i className="fa fa-exclamation-triangle" style={{ color: 'red' }}></i>
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
      <div>
        <ResetPasswordHeader />
        <div className="login-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-7 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br></br>
                <br></br>
                <h2><em><i>Please input your new password</i></em></h2>
              </section>
              <section className="col-md-5 account">
                <div>
                  <form className="login-form">
                    {this.renderAlert()}
                    <h3 className="login-form-boxx">Update Password</h3>
                    <br></br>
                    <div className="form-group">
                      <label htmlFor="enterPassword">New Password:</label>
                      <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-unlock-alt"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          placeholder="Enter new password"
                          ref="newPassword"
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
                          <i className="fa fa-unlock-alt"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          ref="confirmPassword"
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
                      <br></br>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessages: state.user.error
});

export default connect(mapStateToProps, { verifyTokenPassword })(ResetPassword);

