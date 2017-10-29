import React from 'react';
import { UserNavHeader, ProfileHeader, UserSection } from '../../views/index';
import { updateUserRecord } from '../../actions/userActions';
import { connect } from 'react-redux';

@connect((state) => {
    return { state, }
})
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            mobileNumber: 0,
            email: '',
            hasErrored: false,
            errorMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userData) {
            this.setState({
                username: nextProps.userData.username,
                firstName: nextProps.userData.firstName,
                lastName: nextProps.userData.lastName,
                mobileNumber: nextProps.userData.mobileNumber,
                email: nextProps.userData.email
            });
        }
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUpdate(e) {
        e.preventDefault();
        console.log('state: ', this.state);
        let { username, firstName, lastName, mobileNumber, email, password } = this.state;
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let numericExpression = /^[0-9]+$/;
        let regExpression = /^[A-Za-z][A-Za-z0-9-]+$/i;
        let valid;
        if (!valid) {
            if (!username.match(regExpression)) {
                return this.setState({
                    hasErrored: true,
                    errorMessage: 'Username must start with a letter and have no spaces.'
                });
            }
            if (firstName.length < 4) {
                return this.setState({
                    hasErrored: true,
                    errorMessage: 'firstName must contain more than 3 chareacters'
                });
            }
            if (firstName.match(numericExpression)) {
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
            if (lastName.lenght < 4) {
                return this.setState({
                    hasErrored: true,
                    errorMessage: 'lastName must contain more than 4 chareacters'
                });
            }
            if (lastName.match(numericExpression)) {
                return this.setState({
                    hasErrored: true,
                    errorMessage: 'firstName must contain only alphabets'
                });
            }
            if (reg.test(email) === false) {
                return this.setState({
                    hasErrored: true,
                    errorMessage: 'Invalid Email Address'
                });
            }
        }
        this.setState({
            hasErrored: false,
            errorMessage: ''
        });
        return this.props.updateUserRecord(this.props.userData.id, username, firstName, lastName, mobileNumber, email);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <p className="alert error-alert">
                        <i className="fa fa-exclamation-triangle" style={{ color: 'red' }}></i>
                        &nbsp;{this.props.errorMessage}</p>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <UserNavHeader />
                <div className="banner-background">
                    <div className="profile-background">
                        <div className="container">
                            <ProfileHeader />
                            <br></br>
                            <div className="row profile-landing">
                                <section className="col-md-3 profile-details">
                                    <UserSection />
                                </section>
                                <section className="col-md-9 profile-tabs" >
                                    <div className="edit-profile-div-section">
                                        <br></br>
                                        <h3><b>Edit Profile</b></h3>
                                        <br></br>
                                        {this.renderAlert()}
                                        <form className="reg-form" onSubmit={this.handleUpdate}>
                                            <div className="form-group">
                                                <label for="enterFirstName">Username:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-user"></i>
                                                    </span>
                                                    <input
                                                        name="username"
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                        value={this.state.username}
                                                        onChange={this.handleChange}
                                                        required formNoValidate
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterFirstName">First Name:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-user-o"></i>
                                                    </span>
                                                    <input
                                                        name="firstName"
                                                        type="text"
                                                        className="form-control"
                                                        id="firstName"
                                                        value={this.state.firstName}
                                                        onChange={this.handleChange}
                                                        required formNoValidate
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterLastName">Last Name:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-user-o"></i>
                                                    </span>
                                                    <input
                                                        name="lastName"
                                                        type="text"
                                                        className="form-control"
                                                        id="lastName"
                                                        value={this.state.lastName}
                                                        onChange={this.handleChange}
                                                        required formNoValidate
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterMobile">Mobile:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-mobile"></i>
                                                    </span>
                                                    <input
                                                        name="mobileNumber"
                                                        type="number"
                                                        className="form-control"
                                                        id="mobileNumber"
                                                        value={this.state.mobileNumber}
                                                        onChange={this.handleChange}
                                                        required formNoValidate
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterEmail">Email address:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-envelope"></i>
                                                    </span>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        value={this.state.email}
                                                        onChange={this.handleChange}
                                                        required formNoValidate
                                                    />
                                                </div>
                                            </div>
                                            <div className="edit-profile-button">
                                                <button type="submit" className="btn btn-success" type="submit" >Update</button>
                                                <a href="#dashboard"><button type="button" className="btn btn-success">Cancel</button></a>
                                            </div>
                                        </form>
                                        {this.state.hasErrored ?
                                            <p class="alert error-alert">
                                                <i className="fa fa-exclamation-triangle"></i>
                                                &nbsp;{this.state.errorMessage}
                                            </p> : ''
                                        }
                                        <br></br>
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
/**
 * 
 * @param {any} state 
 * @returns 
 */
function mapStateToProps(state) {
    return {
        userData: state.auth.userData,
        errorMessage: state.user.error,
    };
}

export default connect(mapStateToProps, { updateUserRecord })(EditProfile);

