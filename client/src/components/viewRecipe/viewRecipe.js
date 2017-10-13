import React from "react";
import { UserNavHeader, ReviewBox } from "../../views/index";
import { connect } from 'react-redux';
import { fetchUsername } from '../../actions/auth';
import { getRecipe } from '../../actions/recipe';
import { postReview, getReviews } from '../../actions/review';
import { upvoteRecipe, downvoteRecipe } from '../../actions/vote';

@connect((state) => {
  return { state, }
})

class ViewRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      isLoading: true,
      reviewMessage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePostReview = this.handlePostReview.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getRecipe(id)
  }

  componentWillReceiveProps(nextprops) {
    console.log("here", nextprops);
    if (nextprops.state.recipe.recipeList && nextprops.state.review.reviewList) {
      const { recipeList } = nextprops.state.recipe
      this.setState({
        recipe: Object.assign({}, this.state.recipe, recipeList),
        isLoading: false,
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    let categoryName = this.state
    categoryName[field] = e.target.value;
    return this.setState({categoryName: user});
  }

  handlePostReview(e) {
    this.setState({
      reviewMessage: ''
    });
    const { id } = this.props.match.params
    let { reviewMessage } = this.state;
    this.props.postReview(reviewMessage, id)
    this.props.getRecipe(id)
  }

  handleUpvote = (e) => {
    const { id } = this.props.match.params
    this.props.upvoteRecipe(id)
  }

  handleDownvote = (e) => {
    const { id } = this.props.match.params
    this.props.downvoteRecipe(id)
  }

  /**
   * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   * @param {component} <Footer/> - The landing page footer navigation.
   */
  render() {
    if (this.state.isLoading) return (<div>IS LOADING....</div>)
    const ingredients = this.props.recipe.ingredients.split(',').map(item => item.trim());
    const directions = this.props.recipe.directions.split(',').map(item => item.trim());
    const reviewFields = this.props.recipe.reviews;


    return (
      <div>
        <UserNavHeader firstName={this.props.userData.firstName} lastName={this.props.userData.lastName} onChange={this.handleLogout} />
        <div className="banner-background">
          <div className="recipe-background">
            <div className="container">
              <div className="row recipe-top">
                <section className="col-md-6 title-area">
                  <h3>{this.props.state.recipe.recipeList.recipeName}</h3>
                  <br></br>
                  <div>
                    <p>{this.props.state.recipe.recipeList.recipeDescription}</p>
                  </div>
                  <br></br>
                  <div>
                    <p>{this.props.state.recipe.recipeList.views}<span><b>Views |</b></span></p>
                    {/* <p>{this.props.state.recipe.recipeList.reviews.length}<span><b>Reviews |</b></span></p> */}
                    <p>{this.props.recipeVotes.upvotes}
                      {/* {
                        this.props.upvote === 0 ?
                          this.props.state.recipe.recipeList.upvotes
                          : this.props.recipeVotes.upvotes
                      } */}
                      <span><b>Upvotes |</b></span></p>
                    <p>{this.props.recipeVotes.downvotes}
                      {/* {
                        this.props.downvote === 0 ?
                          this.props.state.recipe.recipeList.downvotes
                          : this.props.recipeVotes.downvotes
                      } */}
                      <span><b>Downvotes |</b></span></p>
                  </div>
                </section>
                <section className="col-md-6 recipe-image">
                  <img className="img-thumbnail" src="/dist/egusi_new.jpg" alt="egusi soup image" />
                </section>
              </div>
              <hr></hr>
              <div className="recipe-button">
                <button type="button" className="btn btn-success btn-lg" id="favorite" data-toggle="modal" data-target="#categoryModal">Favorite</button>
                <button type="button" className="btn btn-success  btn-lg" id="upvote" onClick={this.handleUpvote}>Upvote</button>
                <button type="button" className="btn btn-success  btn-lg" id="downvote" onClick={this.handleDownvote}>Downvote</button>
              </div>
              <br></br>
              <div>
                <h3> Ingredients</h3>
              </div>
              <hr></hr>
              <div className="row recipe-ingredients">
                <section className="col-md-6">
                  <div>
                    <ul>
                      {ingredients.map((item, i) => <li key={i}><i className="fa fa-dot-circle-o"></i><span>{item}</span></li>)}
                    </ul>
                  </div>
                </section>
              </div>
              <br></br>
              <div>
                <h3> Directions</h3>
              </div>
              <hr></hr>
              <div className="row recipe-ingredients">
                <section className="col-md-12">
                  <div>
                    <ul>
                      {directions.map((item, i) => <li key={i}><i className="fa fa-dot-circle-o"></i><span>{item}</span></li>)}
                    </ul>
                  </div>
                </section>
              </div>
              <br></br>
              <div>
                <h3> Reviews</h3>
              </div>
              <hr></hr>
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
                  <br></br>
                  <div>
                    <button type="button" className="btn btn-success" onClick={this.handlePostReview}>Add Review</button>
                  </div>
                </section>
              </div>
              <div>
                {this.props.reviewData.userId &&
                  < ReviewBox
                    username={this.props.userData.username}
                    createdAt={this.props.reviewData.createdAt}
                    message={this.props.reviewData.message}
                  />
                }
                {
                  reviewFields.map((item, i) => {
                    return (
                      < ReviewBox
                        key={i} username={item.User.username}
                        createdAt={item.createdAt}
                        message={item.message} />
                    )
                  })
                }
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
        <div className="modal fade" id="categoryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title col-md-6" id="exampleModalLabel">Select Category</h5>
                <button type="button" className="close col-md-6" data-dismiss="modal" aria-label="Close" >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div class="form-group">
                  <label for="category-list">Select Category</label>
                  <select
                  type="text"
                  className="form-control"
                  ref="categoryName"
                  name="categoryName"
                  value={this.state.categoryName}
                  onChange={this.handleChange}
                >
                  {
                    (this.props.userRecipe && this.props.userRecipe.length > 0) ?
                      this.props.userRecipe.map((userRecipe, index) => <option value={userRecipe.recipeName} key={index} >{userRecipe.recipeName}</option>)
                      : null
                  }
                </select>
                  <button type="button" class="btn btn-success">Load Recipe Details</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" data-dismiss="modal">Recover Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.review, 'uuuuuu')
  return {
    userData: state.auth.userData,
    recipe: state.recipe.recipeList,
    review: state.review.reviewList,
    reviewData: state.review.reviewData,
    recipeVotes: state.vote.recipe,
    upvote: state.vote.upvote,
    downvote: state.vote.downvote,
  };
}
export default connect(mapStateToProps, { getRecipe, getReviews, postReview, upvoteRecipe, downvoteRecipe })(ViewRecipe);

