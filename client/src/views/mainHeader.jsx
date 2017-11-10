import React from 'react';
import Logo from '../../public/images/recipe_logo.png';
import { NavLink } from 'react-router-dom';

/**
 * MainHeader commponent
 * @returns {component} MainHeader
 */
const MainHeader = () => (
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
          <span className="navbar-toggler-icon"></span>
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
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link"
                activeClassName="active"
                exact
              >Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/signup"
                className="nav-link"
                activeClassName="active"
                exact
              >SignUp
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  </div>
);

export default MainHeader;

