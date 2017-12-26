import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserNavHeader, ReviewBox } from '../../common';
import { getRecipe } from '../../actions/recipeActions';
import { postReview } from '../../actions/reviewActions';
import { upvoteRecipe, downvoteRecipe } from '../../actions/voteActions';
import {
  favoriteRecipe,
  unfavoriteRecipe,
  getFavoriteRecipe
} from '../../actions/favoriteActions';

/**
 * ViewRecipe component
 * @class ViewRecipe
 * @extends {React.Component}
 */
@connect(state => ({ state, }))
class ViewRecipe extends React.Component {
  static propTypes = {
    getRecipe: PropTypes.func.isRequired,
    postReview: PropTypes.func.isRequired,
    upvoteRecipe: PropTypes.func.isRequired,
    downvoteRecipe: PropTypes.func.isRequired,
    favoriteRecipe: PropTypes.func.isRequired,
    unfavoriteRecipe: PropTypes.func.isRequired,
    getFavoriteRecipe: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    recipe: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    upvote: PropTypes.number.isRequired,
    downvote: PropTypes.number.isRequired
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      ingredients: {},
      directions: {},
      reviewMessage: '',
      isFavorite: true,
      isLoading: true,
      upVoteState: true,
      downVoteState: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePostReview = this.handlePostReview.bind(this);
    this.handleFavoriteRecipe = this.handleFavoriteRecipe.bind(this);
    this.handleUnfavoriteRecipe = this.handleUnfavoriteRecipe.bind(this);
  }

  /**
   * @memberOf Favorite
   * @returns {*} void
   */
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getRecipe(id);
    this.props.getFavoriteRecipe(id);
  }

  /**
   * @param {any} nextprops
   * @memberOf UserNavHeader
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.recipe) {
      const { recipeList } = nextprops.state.recipe;
      if (Object.keys(recipeList).length > 0) {
        this.setState({
          recipe: Object.assign({}, this.state.recipe, recipeList),
          ingredients: recipeList.ingredients.split(',').map(item => item.trim()),
          directions: recipeList.directions.split(',').map(item => item.trim()),
          isLoading: false,
        });
      }
    }

    if (nextprops.state.favorite) {
      const { favoriteData } = nextprops.state.favorite;
      if (Object.keys(favoriteData).length < 1) {
        this.setState({
          isFavorite: false,
          isLoading: false,
        });
      }
    }
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
   * handle post review form event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handlePostReview(e) {
    e.preventDefault();
    this.setState({
      reviewMessage: ''
    });
    const { id } = this.props.match.params;
    const { reviewMessage } = this.state;
    this.props.postReview(reviewMessage, id);
    this.props.getRecipe(id);
  }

  /**
   * handle upvote event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleUpvote = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.upvoteRecipe(id);
    this.setState({
      upVoteState: false,
      downVoteState: false
    });
  }

  /**
   * handle downvote event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleDownvote = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.downvoteRecipe(id);
    this.setState({
      upVoteState: false,
      downVoteState: false
    });
  }

  /**
   * handle favorite event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleFavoriteRecipe(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.favoriteRecipe(id, this.categoryInput.value);
    this.setState({
      isFavorite: true
    });
  }

  /**
   * handle unfavorite event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleUnfavoriteRecipe(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.unfavoriteRecipe(id);
    this.setState({
      isFavorite: false
    });
  }

  /**
   * handle handleVote event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleUpVote() {
    if (this.state.upVoteState) {
      return this.state.recipe.upvotes;
    }
    return this.props.upvote;
  }

  /**
   * handle handleVote event
   * @param {SytheticEvent} e
   * @returns {*} void
   */
  handleDownVote() {
    if (this.state.downVoteState) {
      return this.state.recipe.downvotes;
    }
    return this.props.downvote;
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    if (this.state.isLoading) return (<div>IS LOADING....</div>);
    const reviewFields = this.state.recipe.reviews;
    return (
      <div>
        <UserNavHeader />
        <div className="banner-background">
          <div className="recipe-background">
            <div className="container">
              <div className="row recipe-top">
                <section className="col-md-6 title-area">
                  <h3>{this.state.recipe.recipeName}</h3>
                  <br />
                  <div>
                    <p>{this.state.recipe.recipeDescription}</p>
                  </div>
                  <br />
                  <div>
                    <p>{this.state.recipe.views}<span><b>Views |</b></span></p>
                    <p>{this.handleUpVote()}
                      <span><b>Upvotes |</b></span>
                    </p>
                    <p>{this.handleDownVote()}
                      <span><b>Downvotes |</b></span>
                    </p>
                  </div>
                </section>
                <section className="col-md-6 recipe-image">
                  <img
                    className="img-thumbnail"
                    src={(this.state.recipe.imageUrl === null || this.state.recipe.imageUrl === 'no-image') ? 'dist/pizza1.jpg'
                  : this.state.recipe.imageUrl}
                    alt="egusi soup"
                  />
                </section>
              </div>
              <hr />
              <div className="recipe-button">
                {
                  this.state.isFavorite ?
                    <button type="button" className="btn btn-success btn-lg" id="favorite" onClick={this.handleUnfavoriteRecipe}>UnFavorite</button>
                : <button type="button" className="btn btn-success btn-lg" id="favorite" data-toggle="modal" data-target="#categoryModal">Favorite</button>
                }
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  id="upvote"
                  onClick={this.handleUpvote}
                >Upvote
                </button>
                <button
                  type="button"
                  className="btn btn-success  btn-lg"
                  id="downvote"
                  onClick={this.handleDownvote}
                >Downvote
                </button>
              </div>
              <br />
              <div>
                <h3> Ingredients</h3>
              </div>
              <hr />
              <div className="row recipe-ingredients">
                <section className="col-md-6">
                  <div>
                    <ul>
                      {this.state.ingredients.map(item => <li key={item}><i className="fa fa-dot-circle-o" /><span>{item}</span></li>)}
                    </ul>
                  </div>
                </section>
              </div>
              <br />
              <div>
                <h3> Directions</h3>
              </div>
              <hr />
              <div className="row recipe-ingredients">
                <section className="col-md-12">
                  <div>
                    <ul>
                      {this.state.directions.map(item => <li key={item}><i className="fa fa-dot-circle-o" /><span>{item}</span></li>)}
                    </ul>
                  </div>
                </section>
              </div>
              <br />
              <div>
                <h3> Reviews</h3>
              </div>
              <hr />
              <div className="recipe-review">
                <section>
                  <div>
                    <textarea
                      className="form-control form-rounded"
                      name="reviewMessage"
                      rows="3"
                      value={this.state.reviewMessage}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <br />
                  <div>
                    <button type="button" className="btn btn-success" onClick={this.handlePostReview}>Add Review</button>
                  </div>
                </section>
              </div>
              <div>
                {
                  reviewFields.map(review => (
                    <ReviewBox
                      key={review.id}
                      username={review.User.username}
                      createdAt={review.createdAt.substring(0, 10)}
                      message={review.message}
                    />
                    ))
                }
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="modal fade" id="categoryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">Select Category</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="category-list">Select Category</label>
                  <select
                    type="text"
                    className="form-control"
                    name="categoryName"
                    ref={node => this.categoryInput = node}
                  >
                    {
                      (this.props.categories && this.props.categories.length > 0) ?
                        this.props.categories.map(category =>
                          <option value={category.id} key={category.id} >{category.name}</option>)
                        : null
                    }
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.handleFavoriteRecipe}>Favorite Recipe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  categories: state.category.categoryList,
  recipe: state.recipe.recipeList,
  reviewData: state.review.reviewData,
  upvote: state.vote.upvote,
  downvote: state.vote.downvote
});

export default connect(
  mapStateToProps,
  {
    getRecipe,
    getFavoriteRecipe,
    postReview,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    unfavoriteRecipe
  }
)(ViewRecipe);

