import React from "react";
import { MainHeader } from "../views/index";
import '../../public/style.css';
import Sharwarma from './images/sharwama.jpg';
import Egusi from './images/egusi_soup.jpg';
import JollofRice from './images/jollofrice.jpg';
import FriedRice from './images/friedrice.jpg';
import Cake from './images/chocolate_cake.jpg';
import Pizza from './images/pizza1.jpg';
import Chips from './images/chickenChips.jpg';
import PepperSoup from './images/peppersoup.jpg';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 

class Landing extends React.Component {
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
        <div className="landing-background">
          <div className="container">
            <div className="row landing">
              <section className="col-md-7 headline">
                <h1>Welcome to More recipes</h1>
                <h4>Share your recipe ideas with the world</h4>
                <br></br>
                <br></br>
                <a href="#top-recipes"><button className="btn btn-success">View top recipes</button></a>
                <p className="arrow-key"><i className="fa fa-arrow-down" aria-hidden="true"></i> <i className="fa fa-arrow-down" aria-hidden="true"></i> <i className="fa fa-arrow-down" aria-hidden="true"></i></p>
              </section>
              <section className="col-md-5 account">
                <div>
                <a href="./login.html">
                <button type="button" className="btn btn-success" id="login" data-toggle="modal" data-target="#myModal">Login</button>
                  <p className="brief">Login to your account and start sharing</p>
                </a>
                </div>
                <div>
                <a href="./signup.html">
                  <button className="btn btn-success" id="signup">Signup</button>
                  <p className="brief">Register now to enjoy all of More recipes</p>
                </a>
                </div>
              </section>
            </div>
          </div>
        </div>
          <section id="top-recipes">
            <div className="heading">
              <h3>Welcome to the top recipes of the week</h3>
            </div>
          <div className="card-blocks-home" >
            <div className="card">
                <img className="card-img-top" src={Egusi} alt="Card image cap"/>
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
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={Sharwarma} alt="Card image cap"/>
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
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={FriedRice} alt="Card image cap"/>
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
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={Cake} alt="Card image cap"/>
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
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={Chips} alt="Card image cap"/>
                <div className="card-block">
                  <h4 className="card-title">Chicken and Chips</h4>
                  <p className="card-text">Popular food all over the world. Very easy to prepare</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                     <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>200</span>
                  <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>30</span>
                  <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>90</span>
                  <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>60</span>
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={JollofRice} alt="Card image cap"/>
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
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={Pizza} alt="Card image cap"/>
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
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={PepperSoup} alt="Card image cap"/>
                <div className="card-block">
                  <h4 className="card-title">Peppersoup</h4>
                  <p className="card-text">This recipe is sweet, tasty and delicious. Assorted meat and fish goews well with it</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                     <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>200</span>
                  <span className="reviews"><i className="fa fa-comment" aria-hidden="true"></i>30</span>
                  <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>90</span>
                  <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>60</span>
                  <button type="button" className="btn btn-secondary btn-sm">More</button>
                  </small>
                </div>
             </div>
          </div>
        </section>
        <br></br>
      </div>
    );
  }
}

export default Landing;
