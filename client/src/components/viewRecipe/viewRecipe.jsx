import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import { UserNavHeader, ReviewBox, Footer } from '../../common';
import { getRecipe } from '../../actions/recipeActions';
import { postReview, getReviews } from '../../actions/reviewActions';
import { upvoteRecipe, downvoteRecipe } from '../../actions/voteActions';
import {
  favoriteRecipe,
  unfavoriteRecipe,
  getFavoriteRecipe
} from '../../actions/favoriteActions';
import SelectCategoryModal from './selectCategoryModal.jsx';

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
    getReviews: PropTypes.func.isRequired,
    upvoteRecipe: PropTypes.func.isRequired,
    downvoteRecipe: PropTypes.func.isRequired,
    favoriteRecipe: PropTypes.func.isRequired,
    unfavoriteRecipe: PropTypes.func.isRequired,
    getFavoriteRecipe: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object),
    recipe: PropTypes.shape({
      params: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    upvote: PropTypes.number.isRequired,
    downvote: PropTypes.number.isRequired,
    userData: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string
    })
  };

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      reviews: [],
      ingredients: {},
      directions: {},
      reviewMessage: '',
      isFavorite: true,
      isLoading: true,
      upVoteState: true,
      downVoteState: true,
      modalIsOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePostReview = this.handlePostReview.bind(this);
    this.handleFavoriteRecipe = this.handleFavoriteRecipe.bind(this);
    this.handleUnfavoriteRecipe = this.handleUnfavoriteRecipe.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * @memberOf Favorite
   * @returns {*} void
   */
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getRecipe(id);
    this.props.getFavoriteRecipe(id);
    this.props.getReviews(id);
  }

  /**
   * @param {any} nextprops
   * @memberOf UserNavHeader
   * @returns {*} void
   */
  componentWillReceiveProps(nextprops) {
    if (nextprops.state.recipe && nextprops.reviews) {
      const { recipeData } = nextprops.state.recipe;
      const reviewList = nextprops.reviews;
      if (Object.keys(recipeData).length > 0) {
        this.setState({
          recipe: Object.assign({}, this.state.recipe, recipeData),
          reviews: Object.assign([], this.state.reviews, reviewList),
          ingredients: recipeData.ingredients.split(',').map(item => item.trim()),
          directions: recipeData.directions.split(',').map(item => item.trim()),
          isLoading: false,
        });
      }
    }

    if (nextprops.state.favorite) {
      const { favoriteData } = nextprops.state.favorite;
      if (Object.keys(favoriteData).length < 1) {
        this.setState({
          isFavorite: false
        });
      }
    }
  }

  /**
   * handle change form event
   * @param {SytheticEvent} event
   * @returns {object} state
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handle post review form event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handlePostReview(event) {
    event.preventDefault();
    this.setState({
      reviewMessage: ''
    });
    const { id } = this.props.match.params;
    const { reviewMessage } = this.state;
    this.props.postReview(reviewMessage, id);
  }

  /**
   * handle upvote event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleUpvote = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    this.props.upvoteRecipe(id);
    this.setState({
      upVoteState: false,
      downVoteState: false
    });
  }

  /**
   * handle downvote event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleDownvote = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    this.props.downvoteRecipe(id);
    this.setState({
      upVoteState: false,
      downVoteState: false
    });
  }

  /**
   * handle favorite event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleFavoriteRecipe(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    this.props.favoriteRecipe(id, this.categoryInput.value);
    this.setState({
      isFavorite: true,
      modalIsOpen: false,
    });
  }

  /**
   * handle unfavorite event
   * @param {SytheticEvent} event
   * @returns {*} void
   */
  handleUnfavoriteRecipe(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    this.props.unfavoriteRecipe(id);
    this.setState({
      isFavorite: false
    });
  }

  /**
   * handle handleVote event
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
   * @returns {*} void
   */
  handleDownVote() {
    if (this.state.downVoteState) {
      return this.state.recipe.downvotes;
    }
    return this.props.downvote;
  }

  /**
   * handle open modal event
   * @returns {*} void
   */
  openModal() {
    if (this.props.categories.length === 0) {
      const { id } = this.props.match.params;
      this.props.favoriteRecipe(id, 88);
      this.setState({
        isFavorite: true
      });
    } else {
      this.setState({
        modalIsOpen: true
      });
    }
  }

  /**
   * handle close modal event
   * @returns {*} void
   */
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    if (this.state.isLoading) return (<Loader type="ball-scale-ripple-multiple" active />);
    const reviewFields = this.state.reviews;
    const customStyles = {
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    return (
      <div>
        <UserNavHeader />
        <div className="banner-background">
          <div className="recipe-background">
            <div className="container">
              <div className="row recipe-top">
                <section className="col-md-6 title-area">
                  <h3>{this.state.recipe.name}</h3>
                  <br />
                  <div>
                    <p>{this.state.recipe.description}</p>
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
                    <button
                      type="button"
                      className="btn btn-success btn-lg"
                      id="favorite"
                      onClick={this.handleUnfavoriteRecipe}
                    >UnFavorite
                    </button>
                : <button
                  type="button"
                  className="btn btn-success btn-lg"
                  id="favorite"
                  onClick={this.openModal}
                >Favorite
                  </button>
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
                      username={review.User ? review.User.username : this.props.userData.username}
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
        <SelectCategoryModal
          isOpen={this.state.modalIsOpen}
          onClose={this.closeModal}
          customStyles={customStyles}
          categories={this.props.categories}
          categoryInput={node => this.categoryInput = node}
          favoriteRecipe={this.handleFavoriteRecipe}
        />
        <Footer />
      </div>
    );
  }
}

ViewRecipe.defaultProps = {
  categories: null,
  userData: {}
};

const mapStateToProps = state => ({
  categories: state.category.categoryList,
  recipe: state.recipe.recipeData,
  reviews: state.review.reviewList,
  upvote: state.vote.upvote,
  downvote: state.vote.downvote,
  userData: state.auth.userData
});

export default connect(
  mapStateToProps,
  {
    getRecipe,
    getFavoriteRecipe,
    postReview,
    getReviews,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    unfavoriteRecipe
  }
)(ViewRecipe);

