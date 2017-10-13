import React from 'react';
import Logo from '../../public/images/recipe_logo.png';
import { addCategory, getUserCategories } from './../actions/category';

const UserSection = ({ username, categories, category, categoryName, onChange, onClick }) => {


	return (
		<main>
			<div className="div-profile">
				<h5>{username}</h5>
				<h6>@andela</h6>
				<p><span><i className="fa fa-circle" aria-hidden="true" style={{ color: 'green' }}></i></span>Online</p>
				<br></br>
				<br></br>
				<a href="#editProfile"><button className="btn btn-success">Edit Profile</button></a>
			</div>
			<br />
			<div className="div-profile">
				<h5>Add Category</h5>
				<div className="form-group profile-form">
					<input 
					type="text" 
					className="form-control" 
					name="categoryName"
					id="category-name" 
					placeholder="Enter Name"
					onChange={onChange}
					value={category.categoryName}
					 />
				</div>
				<div>
					<button 
					type="button" 
					className="btn btn-success"
					onClick={onClick}
					>Add
					</button>
				</div>
				<br></br>
				<div className="profile-category-button">
					{
						(categories && categories.length > 0) ?
							categories.map((category, index) => <button type="button" className="btn btn-default btn-sm" key={index}>{category.name} <span className="badge text-right">7</span></button>)
							: null
					}
					{/* <button type="button" className="btn btn-default btn-sm">Local Dish <span className="badge text-right">7</span></button>
					<button type="button" className="btn btn-default btn-sm">Foreign Dish <span className="badge text-right">9</span></button>
					<button type="button" className="btn btn-default btn-sm">Cakes<span className="badge text-right">9</span></button> */}
				</div>
			</div>
		</main>
	);
}
export default UserSection;

