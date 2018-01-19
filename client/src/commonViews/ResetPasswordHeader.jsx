import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../public/assets/images/recipe_logo.png';

/**
 * ResetPasswordHeader commponent
 *
 * @returns {jsx} jsx
 */
const ResetPasswordHeader = () => (
  <div>
    <header>
      <nav
        className="navbar navbar-toggleable-md fixed-top navbar-light bg-faded"
        id="brand-color"
      >
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a href="#/" className="navbar-brand">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />MoreRecipes
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink
                to="/"
                className="nav-link"
                activeClassName="active"
                exact
              >Home
              </NavLink>
              <span className="sr-only">(current)</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
);

export default ResetPasswordHeader;

