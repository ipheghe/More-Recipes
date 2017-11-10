import React from 'react';

const UserNavMenu = () => {
  return (
    <div>
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
    </div>
  );
}
export default UserNavMenu;