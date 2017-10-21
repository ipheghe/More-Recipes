import React from 'react';
import Logo from '../../public/images/recipe_logo.png';
import { connect } from 'react-redux';
import { fetchUsername, logoutUser } from '../actions/auth';

class UserNavHeader extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		this.props.fetchUsername();
	}

	handleLogout(e) {
		e.preventDefault();
		this.props.logoutUser();
	}


	render() {
		return (
			<div>
				<header>
					<nav className="navbar navbar-toggleable-md fixed-top navbar-light bg-faded" id="brand-color">
						<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<a className="navbar-brand" href="#">
							<img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="logo" />
							MoreRecipes
				  </a>
						<div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ float: 'right' }}>
							<ul className="navbar-nav mr-auto">
							</ul>
							<ul className="nav justify-content-end" id="profile-nav">
								<li className="nav-item">
									<a className="nav-link" href="#"><span><i className="fa fa-bell" aria-hidden="true"></i></span>Notifications<span className="badge badge-pill badge-danger">2</span></a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="./profile.html"><span><i className="fa fa-user" aria-hidden="true"></i></span> {this.props.userData.firstName} {this.props.userData.lastName}</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" onClick={this.handleLogout}><span><i className="fa fa-sign-out" aria-hidden="true"></i></span> Logout</a>
								</li>
							</ul>
						</div>
					</nav>
				</header>
			</div>
		);
	}
}
function mapStateToProps(state) {
  return {
    userData: state.auth.userData,
  };
}
export default connect(mapStateToProps, { fetchUsername, logoutUser })(UserNavHeader);

