import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const FavoriteRecipeCard = ({ recipe }) => (
  <div className="card">
    <img className="card-img-top" src={(recipe.Recipe.imageUrl === null || recipe.Recipe.imageUrl === 'no-image') ? 'dist/pizza1.jpg' : recipe.Recipe.imageUrl} alt="recipe" />
    <div className="card-block">
      <h4 className="card-title">{recipe.Recipe.recipeName}</h4>
      <p className="card-text">{recipe.Recipe.recipeDescription}</p>
    </div>
    <div className="card-footer">
      <small className="text-muted">
        <span className="views"><i className="fa fa-eye" aria-hidden="true" style={{ color: 'green' }} />{recipe.Recipe.views}</span>
        <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true" style={{ color: 'red' }} />{recipe.Recipe.upvotes}</span>
        <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true" style={{ color: 'orange' }} />{recipe.Recipe.downvotes}</span>
        <Link href={`/recipes/${recipe.id}`} className="btn btn-secondary btn-sm" >More</Link>
      </small>
    </div>
  </div>
);

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    recipeName: PropTypes.string.isRequired,
    recipeDescription: PropTypes.string.isRequired,
  }).isRequired
};

export default FavoriteRecipeCard;
