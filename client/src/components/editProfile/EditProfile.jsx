import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProfileHeader, UserSection } from '../../commonViews';
import { updateUserRecord } from '../../actions/userActions';
import EditProfileForm from './EditProfileForm.jsx';
import renderErrorAlert from '../../utils/errorAlert';
import validateEditProfileField from '../../utils/validator/editProfileValidator';

/**
 * EditProfile component
 * @class ViewRecipe
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class EditProfile extends React.Component {
    static propTypes = {
      updateUserRecord: PropTypes.func.isRequired,
      errorMessage: PropTypes.string.isRequired
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
        mobileNumber: '',
        email: '',
        hasErrored: false,
        errorMessage: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.toggleModalState = this.toggleModalState.bind(this);
      this.toggleModalStateOff = this.toggleModalStateOff.bind(this);
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

      const error = validateEditProfileField(
        username,
        fullName,
        mobileNumber,
        email
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
      return this.props.updateUserRecord(
        username,
        fullName,
        mobileNumber,
        email
      );
    }


  /**
   * handle editProfile toggleModalState
   * @returns {string} errorMessage
   */
    toggleModalState() {
      this.setState({
        modalIsOpen: true
      });
    }

  /**
   * handle editProfile toggleModalStateOff
   * @returns {object} state
   */
    toggleModalStateOff() {
      this.setState({
        modalIsOpen: false
      });
    }

  /**
   * render
   * @return {ReactElement} markup
   */
    render() {
      return (
        <div>
          <div className="banner-background">
            <div className="profile-background">
              <div className="container">
                <ProfileHeader />
                <br />
                <div className="row profile-landing">
                  <section className="col-md-3 profile-details">
                    <UserSection
                      modalOpen={this.toggleModalState}
                      modalClosed={this.toggleModalStateOff}
                    />
                  </section>
                  <section className="col-md-9 profile-tabs" >
                    <div className="edit-profile-div-section">
                      <br />
                      <h3><b>Edit Profile</b></h3>
                      <br />
                      {
                        !this.state.modalIsOpen &&
                          <EditProfileForm
                            username={this.state.username}
                            password={this.state.password}
                            fullName={this.state.fullName}
                            mobileNumber={this.state.mobileNumber}
                            email={this.state.email}
                            updateProfile={this.handleUpdate}
                            signup={this.handleSignup}
                            error={
                              renderErrorAlert(this.state.hasErrored, this.props.errorMessage, this.state.errorMessage, 'black')
                            }
                            onChange={this.handleChange}
                          />
                      }
                      <br />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
const mapStateToProps = state => ({
  errorMessage: state.user.error,
  userData: state.auth.userData,
});

export default connect(mapStateToProps, { updateUserRecord })(EditProfile);

