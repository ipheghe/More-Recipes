import React from "react";
import { MainHeader } from "../views/index";
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 

class Login extends React.Component {
/**
 * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
 * 
 * @param {component} <MainHeader/> - The landing page main header navigation.
 * @param {component} <Footer/> - The landing page footer navigation.
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
                <h2><em><i>Login and start sharing recipes</i></em></h2>
              </section>
              <section className="col-md-5 account">
              <div>
                <form action="" className="login-form">
                  <h3 className="login-form-boxx">Login Form</h3>
                  <br></br>
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
                          <div className="checkbox-primary col-md-6">
                              <label>
                                  <input type="checkbox" id="login-checkbox"/><span>Remember me</span>
                              </label>
                          </div>
                          <div className="text-right col-md-6">
                            <a href="#" data-toggle="modal" data-target="#myModal">Forgot your password?</a>
                          </div>
                      </div>
                    <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header"> 
                          <h5 className="modal-title col-md-6" id="exampleModalLabel">Forgot Password?</h5>
                          <button type="button" className="close col-md-6" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">         
                                  <div className="form-group">
                                      <label for="enterEmailForgot">Email address:</label>
                                      <div className="input-group input-group-lg">
                                          <span className="input-group-addon">
                                              <i className="fa fa-envelope"></i>
                                          </span>
                                          <input name="textEmailAddress1" type="email" className="form-control" id="enterEmailForgot" placeholder="Enter email"/>
                                      </div>
                                  </div>     
                            </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-success" data-dismiss="modal">Recover Password</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="login-buttons">
                  <div>
                    <a href="./profile.html">
                        <button type="button" className="btn btn-block btn-success">Login</button>
                    </a>
                  </div>
                  <br></br>
                  <div>
                    <a href="./signup.html">
                        <button type="button" className="btn btn-block btn-success">Sign Up</button>
                    </a>
                    </div>
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

export default Login;
