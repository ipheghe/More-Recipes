import React from "react";
import { UserNavHeader, ProfileHeader, UserSection } from "../views/index";
import Egusi from './images/egusi_soup.jpg';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';


class EditProfile extends React.Component {
    /**
     * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
     * 
     * @param {component} <MainHeader/> - The landing page main header navigation.
     * @param {component} <Footer/> - The landing page footer navigation.
     */
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
                                        <form action="" className="reg-form">
                                            <div className="form-group">
                                                <label for="enterFirstName">First Name:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-user-o"></i>
                                                    </span>
                                                    <input name="textFirstName" type="text" className="form-control" id="enterFirstName" placeholder="Ovie" required="true" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterLastName">Last Name:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-user-o"></i>
                                                    </span>
                                                    <input name="textLastName" type="text" className="form-control" id="enterLastName" placeholder="Ipheghe" required="true" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterMobile">Mobile:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-mobile"></i>
                                                    </span>
                                                    <input name="textMobile" type="number" className="form-control" id="enterMobile" placeholder="08023456533" required="true" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterEmail">Email address:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-envelope"></i>
                                                    </span>
                                                    <input name="textEmailAddress" type="email" className="form-control" id="enterEmail" placeholder="ovie@andela.com" required="true" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="enterPassword">Password:</label>
                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-addon">
                                                        <i className="fa fa-unlock-alt"></i>
                                                    </span>
                                                    <input name="textPassword" type="password" className="form-control" id="enterPassword" />
                                                </div>
                                            </div>
                                            <div className="edit-profile-button">
                                                <button type="submit" className="btn btn-success">Update</button>
                                                <a href="#dashboard"><button type="button" className="btn btn-success">Cancel</button></a>
                                            </div>
                                        </form>
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
export default EditProfile;

