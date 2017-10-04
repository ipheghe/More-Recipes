import React from "react";
import { UserNavHeader, ProfileHeader, UserSection } from "../views/index";
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { protectedTest } from '../actions/auth';
import { fetchUsername } from '../actions/auth';
import jwtDecode from 'jwt-decode';


@connect((state) => {
  return { state, }
})
class AddRecipe extends React.Component {
  /**
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   */
  componentWillMount() {
    this.props.dispatch(fetchUsername());
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
                  <UserSection username={this.props.userData} />
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
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">My Recipes</a>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#myRecipe">Personal Recipes</a>
                          <a className="dropdown-item" href="#manageRecipe">Manage Recipes</a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active " href="#addRecipe">Add Recipe</a>
                      </li>
                    </ul>
                    <br></br>
                    <div className="add-padding">
                      <h3><b> Add Recipe</b></h3>
                      <br></br>
                      <form>
                        <div className="form-group">
                          <label for="recipe-name">Recipe Name</label>
                          <input type="text" className="form-control" id="recipe-name" aria-describedby="recipeHelp" placeholder="Enter Recipe Name" required="true" />
                        </div>
                        <div class="form-group">
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
                        <div class="form-group">
                          <label for="recipe-image">Add Image</label>
                          <input type="file" className="form-control-file" id="recipe-image" aria-describedby="fileHelp" />
                          <small id="fileHelp" className="form-text text-muted">Please attach an image file.</small>
                        </div>
                        <div className="edit-profile-button">
                          <button type="submit" className="btn btn-success" >Add Recipe</button>
                        </div>
                      </form>
                    </div>
                    <br></br>
                  </div>
                  <br></br>
                </section>
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
export default connect(mapStateToProps, { fetchUsername })(AddRecipe);


