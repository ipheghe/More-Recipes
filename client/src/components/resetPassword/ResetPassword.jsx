import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verifyTokenPassword } from '../../actions/userActions';
import ResetPasswordForm from './ResetPasswordForm.jsx';
import renderErrorAlert from '../../utils/errorAlert';

/**
 * Reset password form commponent
 * @class ResetPassword
 * @extends {React.Component}
 */
export class ResetPassword extends React.Component {
  static propTypes = {
    verifyTokenPassword: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
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
    const { newPassword, confirmPassword } = this.state;
    const { token } = this.props.match.params;
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
    return this.props.verifyTokenPassword(newPassword, token);
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
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
                <ResetPasswordForm
                  newPassword={this.state.newPassword}
                  confirmPassword={this.state.confirmPassword}
                  openModal={this.openModal}
                  resetPassword={this.handleResetPassword}
                  error={
                    renderErrorAlert(this.state.hasErrored, this.props.errorMessage, this.state.errorMessage, 'white')
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
  errorMessage: state.user.error
});

export default connect(mapStateToProps, { verifyTokenPassword })(ResetPassword);

