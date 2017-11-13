import React from 'react';
import PropTypes from 'prop-types';
import { getUserCategories } from './../actions/category';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * ProfileHeader component
 * @class ProfileHeader
 * @extends {React.Component}
 */
class ProfileHeader extends React.Component {

  static propTypes = {
    categories: PropTypes.node.isRequired,
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
  * handle change form event
  * @param {SytheticEvent} e
  * @returns {object} state
  */
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * render
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href={undefined}><h2>Profile Page</h2></a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link disabled" />
            </li>
          </ul>
          <ul className="navbar-nav profile-menu">
            <button type="button" className="btn btn-default"><li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="http://example.com"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Browse
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <p className="dropdown-item"><b>Categories</b></p>
                <hr></hr>
                {
                  (this.props.categories && this.props.categories.length > 0) ?
                    this.props.categories.map((category) =>
                      <a className="dropdown-item" key={category.id}>{category.name}</a>)
                    : null
                }
                <br></br>
                <p className="dropdown-item"><b>Favorites</b></p>
                <hr></hr>
                <a className="dropdown-item">Egusi Soup</a>
                <a className="dropdown-item">Pizza</a>
                <a className="dropdown-item">Pepper Soup</a>
              </div>
            </li>
            </button>
          </ul>

          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text" name="keyword"
              value={this.state.keyword}
              onChange={this.handleChange}
              placeholder="Search"
              required formNoValidate
            />
            <Link
              to={`/search?sort=, ${this.state.keyword}`}
              className="btn btn-outline-success my-2 my-sm-0"
            >Search
            </Link>
          </form>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  categories: state.category.categoryList
});

export default connect(mapStateToProps, { getUserCategories })(ProfileHeader);

