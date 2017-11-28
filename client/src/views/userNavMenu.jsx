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
        {/* <NavLink
          to="/myRecipes"
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          activeClassName="active"
          exact
        >My Recipes
        </NavLink> */}
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >My Recipes
        </a>
        <div className="dropdown-menu">
          <NavLink
            to="/myRecipe"
            className="nav-link dropdown-item"
            activeClassName="active"
            exact
          >Personal Recipes
          </NavLink>
          <NavLink
            to="/manageRecipe"
            className="nav-link dropdown-item"
            activeClassName="active"
            exact
          >Manage Recipes
          </NavLink>
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
