import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { verifyTokenPassword } from '../../actions/userActions';
import ResetPasswordForm from './ResetPasswordForm';
import renderErrorAlert from '../../utils/renderErrorAlert';
import resetPasswordValidator
  from '../../utils/validator/resetPasswordValidator';

/**
 * Reset password form commponent
 *
 * @class ResetPassword
 *
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {
  static propTypes = {
    verifyTokenPassword: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  /**
   * constructor
   *
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
   *
   * @param {SytheticEvent} event
   *
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
   *
   * @param {SytheticEvent} event
   *
   * @returns {*} void
   */
  handleResetPassword(event) {
    event.preventDefault();
    this.validateFormField();
  }

  /**
   * validateFormField
   *
   * @returns {*} void
   */
  validateFormField() {
    const { newPassword, confirmPassword } = this.state;
    const { token } = this.props.match.params;

    const error = resetPasswordValidator(newPassword, confirmPassword);

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
    return this.props.verifyTokenPassword(newPassword, token);
  }

  /**
   * render
   *
   * @return {ReactElement} markup
   */
  render() {
    if (this.props.isAuthenticated) {
      return (<Redirect to="/dashboard/top-recipes" />);
    }
    return (
      <div>
        <div className="login-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-6 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br />
                <br />
                <h2>Please input your new password</h2>
              </section>
              <section className="col-md-1" />
              <section className="col-md-5 account">
                <ResetPasswordForm
                  newPassword={this.state.newPassword}
                  confirmPassword={this.state.confirmPassword}
                  openModal={this.openModal}
                  resetPassword={this.handleResetPassword}
                  error={
                    renderErrorAlert(
                      this.state.hasErrored,
                      this.props.errorMessage,
                      this.state.errorMessage, 'white'
                    )
                  }
                  onChange={this.handleChange}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.defaultProps = {
  errorMessage: ''
};

const mapStateToProps = state => ({
  errorMessage: state.user.error,
  isAuthenticated: state.auth.authenticated,
});

export { ResetPassword as PureResetPassword };
export default connect(mapStateToProps, { verifyTokenPassword })(ResetPassword);
