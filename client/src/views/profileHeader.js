import React from 'react';
import Logo from '../../public/images/recipe_logo.png';

const ProfileHeader = (props) => {
  return (  
  		<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#"><h2>Profile Page</h2></a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link disabled" href="#"></a>
              </li>
            </ul>  
            <ul className="navbar-nav profile-menu">
              <button type="button" className="btn btn-default"><li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Browse
                </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <p className="dropdown-item"><b>Categories</b></p>
              <hr></hr>
                  <a className="dropdown-item" href="#">Local Dish </a>
                  <a className="dropdown-item" href="#">Foreign Dish</a>
                  <br></br>
                  <p className="dropdown-item"><b>Ingredients</b></p>
              <hr></hr>
                 <a className="dropdown-item" href="#">Pumpkin Leaf </a>
                 <a className="dropdown-item" href="#">Assorted Meat</a>
                 <a className="dropdown-item" href="#">Pepper aqnd Salt</a>
                 <br></br>
                  <p className="dropdown-item"><b>Favorites</b></p>
              <hr></hr>
                 <a className="dropdown-item" href="#">Egusi Soup</a>
                 <a className="dropdown-item" href="#">Pizza</a>
                 <a className="dropdown-item" href="#">Pepper Soup</a>
                </div>
              </li>
              </button>
            </ul>
            
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      );
}
export default ProfileHeader;

