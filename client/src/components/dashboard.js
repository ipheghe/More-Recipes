import React from "react";
import { UserNavHeader, ProfileHeader, UserSection } from "../views/index";
import Egusi from './images/egusi_soup.jpg';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';
import { fetchUsername } from '../actions/auth';
import jwtDecode from 'jwt-decode';

@connect((state) => {
  return { state, }
})
class Dashboard extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchUsername());
  }

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
                  <UserSection username={this.props.userData} />
                </section>
                <section className="col-md-9 profile-tabs" >
                  <div className="div-section">
                    <ul className="nav nav-tabs nav-fill">
                      <li className="nav-item">
                        <a className="nav-link active" href="#dashboard">Top Recipes</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#favorite">Favorites</a>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My Recipes</a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#myRecipe">Personal Recipes</a>
                          <a className="dropdown-item" href="#manageRecipe">Manage Recipes</a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link " href="#addRecipe">Add Recipe</a>
                      </li>
                    </ul>
                    <br></br>
                    <div className="add-padding">
                      <h3><b>Top Recipes</b></h3>
                      <br></br>
                      <div className="card-blocks" >
                        <div className="card">
                          <img className="card-img-top" src={Egusi} alt="Card image cap" />
                          <div className="card-block">
                            <h4 className="card-title">Egusi Soup</h4>
                            <p className="card-text">This is an african native soup from Nigeria.It is so delicious and suptuous.</p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>420</span>
                              <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>100</span>
                              <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>310</span>
                              <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>60</span>
                              <a href="./viewRecipe.html"><button type="button" className="btn btn-secondary btn-sm">More</button></a>
                            </small>
                          </div>
                        </div>
                        <div className="card">
                          <img className="card-img-top" src={Egusi} alt="Card image cap" />
                          <div className="card-block">
                            <h4 className="card-title">Sharwama</h4>
                            <p className="card-text">This is a nourishing, delightful, and appetizing snack.I so much love it!!!.</p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>320</span>
                              <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>200</span>
                              <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>200</span>
                              <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>60</span>
                              <a href="./viewRecipe.html"><button type="button" className="btn btn-secondary btn-sm">More</button></a>
                            </small>
                          </div>
                        </div>
                        <div className="card">
                          <img className="card-img-top" src={Egusi} alt="Card image cap" />
                          <div className="card-block">
                            <h4 className="card-title">Fried Rice</h4>
                            <p className="card-text">This is a very popular meal all over the world. Everyone loves and enjoys it.</p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>290</span>
                              <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>100</span>
                              <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>190</span>
                              <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>20</span>
                              <a href="./viewRecipe.html"><button type="button" className="btn btn-secondary btn-sm">More</button></a>
                            </small>
                          </div>
                        </div>
                        <div className="card">
                          <img className="card-img-top" src={Egusi} alt="Card image cap" />
                          <div className="card-block">
                            <h4 className="card-title">Chocolate Cake</h4>
                            <p className="card-text">Who cares for a lovely slice of crusty chocolate cake? Everyone is the answer..</p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>220</span>
                              <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>50</span>
                              <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>100</span>
                              <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>40</span>
                              <a href="./viewRecipe.html"><button type="button" className="btn btn-secondary btn-sm">More</button></a>
                            </small>
                          </div>
                        </div>
                        <div className="card">
                          <img className="card-img-top" src={Egusi} alt="Card image cap" />
                          <div className="card-block">
                            <h4 className="card-title">Pepperoni Pizza</h4>
                            <p className="card-text">This recipe is a hearty, zesty main dish with a crisp, golden crust. Feel free to use whatever toppings your family enjoys.</p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>200</span>
                              <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>30</span>
                              <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>90</span>
                              <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>60</span>
                              <a href="./viewRecipe.html"><button type="button" className="btn btn-secondary btn-sm">More</button></a>
                            </small>
                          </div>
                        </div>
                        <div className="card">
                          <img className="card-img-top" src={Egusi} alt="Card image cap" />
                          <div className="card-block">
                            <h4 className="card-title">Jollof Rice</h4>
                            <p className="card-text">The most popular Nigerian dish that has lead to country wars, just kidding!!!.</p>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">
                              <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>220</span>
                              <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>100</span>
                              <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>200</span>
                              <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>60</span>
                              <a href="#viewRecipe"><button type="button" className="btn btn-secondary btn-sm">More</button></a>
                            </small>
                          </div>
                        </div>
                      </div>
                      <br></br>
                    </div>
                  </div>
                </section>
              </div>
              <div className="profile-pagination">
                <nav aria-label="pagination-nav">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#" tabIndex="-1">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active">
                      <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { userData: state.auth.userData };
}

export default connect(mapStateToProps, { fetchUsername })(Dashboard);