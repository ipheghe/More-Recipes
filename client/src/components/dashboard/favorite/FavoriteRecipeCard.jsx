import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const FavoriteRecipeCard = ({ recipe }) => (
  <div className="card">
    <img className="card-img-top" src={(recipe.Recipe.imageUrl === null || recipe.Recipe.imageUrl === 'no-image') ? 'assets/images/pizza1.jpg' : recipe.Recipe.imageUrl} alt="recipe" />
    <div className="card-block">
      <h4 className="card-title">{recipe.Recipe.name}</h4>
      <p className="card-text">{recipe.Recipe.description}</p>
    </div>
    <div className="card-footer">
      <small className="text-muted">
        <div className="landing-card-footer">
          <span className="views"><i className="fa fa-eye" aria-hidden="true" style={{ color: 'green' }} />{recipe.Recipe.views}</span>
          <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true" style={{ color: 'red' }} />{recipe.Recipe.upvotes}</span>
          <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true" style={{ color: 'orange' }} />{recipe.Recipe.downvotes}</span>
        </div>
        <Link to={`/recipes/${recipe.Recipe.id}`} className="btn btn-secondary btn-sm" >More</Link>
      </small>
    </div>
  </div>
);

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired).isRequired
};

export default FavoriteRecipeCard;
