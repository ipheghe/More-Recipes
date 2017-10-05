import React from "react";
import { UserNavHeader, ProfileHeader, UserSection } from "../views/index";
import Egusi from './images/egusi_soup.jpg';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';


class ManageRecipe extends React.Component {
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
                  <div className="div-section">
                    <ul className="nav nav-tabs nav-fill">
                      <li className="nav-item">
                        <a className="nav-link" href="#dashboard">Top Recipes</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#favorite">Favorites</a>
                      </li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle active" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My Recipes</a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#myRecipe">Personal Recipes</a>
                          <a className="dropdown-item" href="#manageRecipe">Manage Recipes</a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#addRecipe">Add Recipe</a>
                      </li>
                    </ul>
                    <br></br>
                    <div className="add-padding">
                      <h3><b>Manage Recipe</b></h3>
                      <br></br>
                      <form>
                        <div className="form-group">
                          <label for="recipe-name-list">Select recipe</label>
                          <select className="form-control" id="recipe-name-list">
                            <option>Egusi Soup</option>
                            <option>Pizza</option>
                            <option>Oha Soup</option>
                            <option>Fried Rice</option>
                          </select>
                          <button type="button" className="btn btn-success">Load Recipe Details</button>
                        </div>
                        <div className="form-group">
                          <label for="recipe-detail">Recipe Detail</label>
                          <input type="text" className="form-control" id="recipe-detail" placeholder="Enter Recipe Detail" />
                        </div>
                        <div class="form-group">
                          <label for="ingredients">Ingredients</label>
                          <textarea className="form-control" id="ingredients" rows="5" required="true"></textarea>
                        </div>
                        <div className="form-group">
                          <label for="directions">Directions</label>
                          <textarea className="form-control" id="directions" rows="10" required="true"></textarea>
                        </div>
                        <div className="form-group">
                          <label for="recipe-image">Add Image</label>
                          <input type="file" className="form-control-file" id="recipe-image" aria-describedby="fileHelp" />
                          <small id="fileHelp" className="form-text text-muted">Please attach an image file.</small>
                        </div>
                        <div className="edit-profile-button">
                          <button type="submit" className="btn btn-success">Update Recipe</button>
                          <button type="submit" className="btn btn-success">Delete Recipe</button>
                        </div>
                      </form>
                    </div>
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
export default ManageRecipe;

