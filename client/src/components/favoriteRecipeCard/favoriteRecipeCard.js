import React from 'react';
import { Link } from 'react-router-dom';


const FavoriteRecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="card">
      <img className="card-img-top" src={(recipe.Recipe.imageUrl === null || recipe.Recipe.imageUrl === 'no-image') ? 'dist/pizza1.jpg' : recipe.Recipe.imageUrl} alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">{recipe.Recipe.recipeName}</h4>
        <p className="card-text">{recipe.Recipe.recipeDescription}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          <span className="views"><i className="fa fa-eye" aria-hidden="true" style={{ color: 'green' }}></i>{recipe.Recipe.views}</span>
          <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true" style={{ color: 'red' }}></i>{recipe.Recipe.upvotes}</span>
          <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true" style={{ color: 'orange' }}></i>{recipe.Recipe.downvotes}</span>
          <Link to={"/recipes/"+recipe.id} className="btn btn-secondary btn-sm" >More</Link>
        </small>
      </div>
    </div>
  );
}
export default FavoriteRecipeCard;