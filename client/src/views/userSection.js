import React from 'react';
import Logo from '../../public/images/recipe_logo.png';
import { addCategory, getUserCategories } from './../actions/category';
import { connect } from 'react-redux';
import { fetchUsername, logoutUser } from './../actions/auth';

@connect((state) => {
	return { state, }
})
class UserSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryName: '',
			categories: [],
			isLoading: true,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleAddCategory = this.handleAddCategory.bind(this);
	}

	componentDidMount() {
			this.setState({
				categories: this.props.dispatch(fetchUsername())
			});
		//this.props.dispatch(fetchUsername());
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleAddCategory(e) {
		e.preventDefault();
		this.props.addCategory(this.state.categoryName)
		this.props.dispatch(fetchUsername());
	}

	componentWillReceiveProps(nextprops) {

		//console.log(nextprops.categories)
		console.log("here categories", nextprops.state.auth.categories);
		if (nextprops.state.auth.categories) {
			console.log(this.state, 'state category')
      this.setState({
        categories: nextprops.state.auth.categories,
        isLoading: false,
      })
    }
  }
	// 	if (nextprops.categories) {
	// 		console.log('***************||***************');
	// 		const categories = this.state.categories;
	// 		this.setState({
	// 			categories: nextprops.categories
	// 		})
	// 	}
	// }

  /**
   * SearchWiki layout component that enables a user search wikipedia right from the dashboard.
   * 
   * @param {component} <MainHeader/> - The landing page main header navigation.
   * @param {component} <Footer/> - The landing page footer navigation.
   */
	render() {


		return (
			<main>
				<div className="div-profile">
					<h5>{this.props.userData.username}</h5>
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
							onChange={this.handleChange}
							value={this.state.categoryName}
						/>
					</div>
					<div>
						<button
							type="button"
							className="btn btn-success"
							onClick={this.handleAddCategory}
						>Add
						</button>
					</div>
					<br></br>
					<div className="profile-category-button">
						{
							(this.state.categories && this.state.categories.length > 0) ?
								this.state.categories.map((category, index) => <button type="button" className="btn btn-default btn-sm" key={index}>{category.name} <span className="badge text-right">7</span></button>)
								: null
						}
					</div>
				</div>
			</main>
		);
	}
}
function mapStateToProps(state) {
	return {
		userData: state.auth.userData,
		recipes: state.recipe.recipeData,
		categories: state.auth.categories
	};
}

export default connect(mapStateToProps, { fetchUsername, addCategory, getUserCategories })(UserSection);

