import React from "react";
import { MainHeader } from "../views/index";
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 

class Register extends React.Component {
/**
 * @param {component} <MainHeader/> - The landing page main header navigation.
 * @param {component} <Register/> - The signup page of the app.
 */
  render() {
    return (
      <div>
        <MainHeader />
        <div className="login-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-7 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br></br>
                <br></br>
                <h2><em><i>Sign Up and start sharing recipes</i></em></h2>
              </section>
              <section className="col-md-5 account">
                <div>
                  <form action="" className="reg-form">
                      <h3 className="login-form-boxx">Registration Form</h3>
                        <br></br>
                            <div className="form-group">
                                <label for="enterUsername">Username:</label>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-user"></i>
                                    </span>
                                    <input name="textUsername" type="text" className="form-control" id="enterUsername" placeholder="e.g john112" required="true"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="enterFirstName">First Name:</label>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-user-o"></i>
                                    </span>
                                    <input name="textFirstName" type="text" className="form-control" id="enterFirstName" placeholder="e.g John" required="true"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="enterLastName">Last Name:</label>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-user-o"></i>
                                    </span>
                                    <input name="textLastName" type="text" className="form-control" id="enterLastName" placeholder="e.g Ken" required="true"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="enterMobile">Mobile:</label>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-mobile"></i>
                                    </span>
                                    <input name="textMobile" type="number" className="form-control" id="enterMobile" placeholder="e.g 08034562838" required="true"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="enterEmail">Email address:</label>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                    <input name="textEmailAddress" type="email" className="form-control" id="enterEmail" placeholder="e.g john@yahoo.com" required="true"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="enterPassword">Password:</label>
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="fa fa-unlock-alt"></i>
                                    </span>
                                    <input name="textPassword" type="password" className="form-control" id="enterPassword" placeholder="" required="true"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                  <a href="./login.html">Already have an account?</a>
                                </div>
                              </div>
                            <div className="login-buttons">
                              <div>
                                <a href="./login.html">
                                  <button type="button" className="btn btn-block btn-success">Sign Up</button>
                                </a>
                              </div>
                              <br></br>
                            <div>
                              <a href="./index.html">
                                <button type="button" className="btn btn-block btn-success">Cancel</button>
                              </a>
                            </div>
                          </div>
                    </form>
                    <br></br>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
