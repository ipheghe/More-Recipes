import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="card">
      <img className="card-img-top" src="/dist/imageUrl-1507480431036.jpg" alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">{recipe.recipeName}</h4>
        <p className="card-text">{recipe.recipeDescription}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          <span className="views"><i className="fa fa-eye" aria-hidden="true"></i>{recipe.views}</span>
          <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true"></i>{recipe.upvotes}</span>
          <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true"></i>{recipe.downvotes}</span>
          {/* <a href="#viewRecipe"><button type="button" className="btn btn-secondary btn-sm" onClick={onClick}>More</button></a> */}
          <Link to="/recipes/7" className="btn btn-secondary btn-sm">More</Link>
        </small>
      </div>
    </div>
  );
}
export default RecipeCard;