import React from "react";
import { UserNavHeader, ReviewBox } from "../../views/index";
import { connect } from 'react-redux';
import { fetchUsername } from '../../actions/auth';
import { getRecipe } from '../../actions/recipe';
import { postReview, getReviews } from '../../actions/review';

@connect((state) => {
  return { state, }
})

class ViewRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      review: [],
      isLoading: true,
      reviewMessage: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePostReview = this.handlePostReview.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params
    this.props.getRecipe(id)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getReviews(id)
  }

  componentWillReceiveProps(nextprops) {
    console.log("here", nextprops);
    if (nextprops.state.recipe.recipeList && nextprops.state.review.reviewList) {
      const { recipeList } = nextprops.state.recipe
      const { reviewList } = nextprops.state.review
      this.setState({
        recipe: Object.assign({}, this.state.recipe, recipeList),
        review: Object.assign({}, this.state.review, reviewList),
        isLoading: false,
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handlePostReview = (e) => {
    this.setState({
      reviewMessage: ''
    });
    const { id } = this.props.match.params
    let { reviewMessage } = this.state;
    this.props.postReview(reviewMessage, id)
    this.props.getReviews(id)
  }

  /**
   * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   * @param {component} <Footer/> - The landing page footer navigation.
   */
  render() {
    if (this.state.isLoading) return (<div>IS LOADING....</div>)
    const ingredients = this.props.state.recipe.recipeList.ingredients.split(',').map(item => item.trim());
    const directions = this.props.state.recipe.recipeList.directions.split(',').map(item => item.trim());
    const reviewFields = this.props.review;
    console.log(reviewFields, "sss");
    console.log(this.props.userData.username)

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
                    <p>{this.props.state.recipe.recipeList.upvotes}<span><b>Upvotes |</b></span></p>
                    <p>{this.props.state.recipe.recipeList.downvotes}<span><b>Downvotes</b></span></p>
                  </div>
                </section>
                <section className="col-md-6 recipe-image">
                  <img className="img-thumbnail" src="/dist/egusi_new.jpg" alt="egusi soup image" />
                </section>
              </div>
              <hr></hr>
              <div className="recipe-button">
                <button type="button" className="btn btn-success btn-lg" id="favorite" data-dismiss="modal">Favorite</button>
                <button type="button" className="btn btn-success  btn-lg" id="upvote">Upvote</button>
                <button type="button" className="btn btn-success  btn-lg" id="downvote">Downvote</button>
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
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.review, 'uuuuuu')
  return {
    userData: state.auth.userData,
    review: state.review.reviewList,
    reviewData: state.review.reviewData,
  };
}
export default connect(mapStateToProps, { getRecipe, getReviews, postReview })(ViewRecipe);

