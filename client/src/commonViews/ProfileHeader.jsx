import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserCategories } from './../actions/categoryActions';
import { getRecipesBySearch } from './../actions/recipeActions';

/**
 * ProfileHeader component
 *
 * @class ProfileHeader
 *
 * @extends {React.Component}
 */
class ProfileHeader extends React.Component {
  static propTypes = {
    getRecipesBySearch: PropTypes.func.isRequired
  };

  /**
   * constructor
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
  * handle change form event
  *
  * @param {SytheticEvent} event
  *
  * @returns {object} state
  */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
  * handle recipe search form event
  *
  * @param {SytheticEvent} event
  *
  * @returns {object} state
  */
  handleSearch(event) {
    event.preventDefault();
    const offset = 0;
    this.props.getRecipesBySearch(this.state.keyword, offset);
    window.location.hash = `#dashboard/search?sort=${this.state.keyword}`;
    this.setState({
      keyword: ''
    });
  }

  /**
   * render
   *
   * @return {ReactElement} markup
   */
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link
            href="#dashboard/top-recipes"
            to="/dashboard/top-recipes"
            className="navbar-brand invisible-button"
          >
            <h2>Profile Page</h2>
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <button className="nav-link invisible-button disabled" />
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              name="keyword"
              value={this.state.keyword}
              onChange={this.handleChange}
              placeholder="Search"
              required
              formNoValidate
            />
            <button
              id="search-recipe"
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={this.handleSearch}
            >Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export { ProfileHeader as PureProfileHeader };
export default connect(
  null,
  { getUserCategories, getRecipesBySearch }
)(ProfileHeader);

