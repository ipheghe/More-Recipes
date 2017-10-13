import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="card">
      <img className="card-img-top" src={(recipe.imageUrl === null || recipe.imageUrl === 'no-image') ? 'dist/pizza1.jpg' : recipe.imageUrl} alt="Card image cap" />
      <div className="card-block">
        <h4 className="card-title">{recipe.recipeName}</h4>
        <p className="card-text">{recipe.recipeDescription}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">
          <span className="views"><i className="fa fa-eye" aria-hidden="true" style={{ color: 'green' }}></i>{recipe.views}</span>
          <span className="upvote"><i className="fa fa-thumbs-up" aria-hidden="true" style={{ color: 'red' }}></i>{recipe.upvotes}</span>
          <span className="downvote"><i className="fa fa-thumbs-down" aria-hidden="true" style={{ color: 'orange' }}></i>{recipe.downvotes}</span>
          {/* <a href="#viewRecipe"><button type="button" className="btn btn-secondary btn-sm" onClick={onClick}>More</button></a> */}
          <Link to="/recipes/7" className="btn btn-secondary btn-sm" >More</Link>
          {/* <a 
            href='#?' 
            className="btn btn-secondary btn-sm"
            onClick={() => {onClick(recipe.id)}}
           >More
          </a> */}
        </small>
      </div>
    </div>
  );
}
export default RecipeCard;