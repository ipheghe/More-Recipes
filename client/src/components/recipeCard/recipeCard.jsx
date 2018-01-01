import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const RecipeCard = ({ recipe }) => (
  <div className="card">
    <img className="card-img-top" src={(recipe.imageUrl === null || recipe.imageUrl === 'no-image') ? 'dist/pizza1.jpg' : recipe.imageUrl} alt="recipe" />
    <div className="card-block">
      <h4 className="card-title">{recipe.name}</h4>
      <p className="card-text">{recipe.description}</p>
    </div>
    <div className="card-footer">
      <small className="text-muted">
        <div className="landing-card-footer">
          <span className="views"><i className="fa fa-eye" aria-hidden="true" style={{ color: 'green' }} />{recipe.views}</span>
          <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true" style={{ color: 'red' }} />{recipe.upvotes}</span>
          <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true" style={{ color: 'orange' }} />{recipe.downvotes}</span>
        </div>
        <Link to={`/recipes/${recipe.id}`} className="btn btn-secondary btn-sm" >More</Link>
      </small>
    </div>
  </div>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired
};

export default RecipeCard;
