import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNavMenu = () => (
  <div>
    <ul className="nav nav-tabs nav-fill">
      <li className="nav-item">
        <NavLink
          to="/dashboard/top-recipes"
          className="nav-link"
          activeClassName="active"
          exact
        >Top Recipes
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/dashboard/favorites"
          className="nav-link"
          activeClassName="active"
          exact
        >Favorites
        </NavLink>
      </li>
      <li className="nav-item dropdown">
        <a
          className=" nav-link dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >My Recipes
        </a>
        <div className="dropdown-menu">
          <NavLink
            to="/dashboard/my-recipes"
            className="dropdown-item"
            activeClassName="active"
            exact
          >Personal Recipes
          </NavLink>
          <NavLink
            to="/dashboard/manage-recipes"
            className="dropdown-item"
            activeClassName="active"
            exact
          >Manage Recipes
          </NavLink>
        </div>
      </li>
      <li className="nav-item">
        <NavLink
          to="/dashboard/add-recipe"
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
