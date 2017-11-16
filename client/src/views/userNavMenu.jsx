import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNavMenu = () => (
  <div>
    <ul className="nav nav-tabs nav-fill">
      <li className="nav-item">
        <NavLink
          to="/dashboard"
          className="nav-link"
          activeClassName="active"
          exact
        >Top Recipes
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/favorite"
          className="nav-link"
          activeClassName="active"
          exact
        >Favorites
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink
          to="/myRecipes"
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          activeClassName="active"
          exact
        >My Recipes
        </NavLink>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#myRecipe">Personal Recipes</a>
          <a className="dropdown-item" href="#manageRecipe">Manage Recipes</a>
        </div>
      </li>
      <li className="nav-item">
        <NavLink
          to="/addRecipe"
          className="nav-link"
          activeClassName="active"
          exact
        >Add Recipe
        </NavLink>
      </li>
    </ul>
  </div>
);
export default UserNavMenu;
