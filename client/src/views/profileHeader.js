import React from 'react';
import Logo from '../../public/images/recipe_logo.png';
import { getRecipesBySearch } from './../actions/recipe';
import { getUserCategories } from './../actions/category';
import { connect } from 'react-redux';

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getUserCategories()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearch(e) {
    e.preventDefault()
    this.getRecipesBySearch(this.state.keyword)
  }

  render() {
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
                {
                  (this.props.categories && this.props.categories.length > 0) ?
                    this.props.categories.map((category, index) => <a className="dropdown-item" href="#" key={index}>{category.name}</a>)
                    : null
                }
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

          <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearch}>
            <input
              className="form-control mr-sm-2"
              type="text" name="keyword"
              value={this.state.keyword}
              onChange={this.handleChange}
              placeholder="Search"
              required formNoValidate
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    categories: state.auth.categories
  };
}

export default connect(mapStateToProps, { getRecipesBySearch, getUserCategories })(ProfileHeader);

