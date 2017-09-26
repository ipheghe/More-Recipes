import React, {PropTypes} from 'react';

const App = (props) => {
	return (<div className='app'>
		{props.children}
		</div>);
};

const Sidebar = React.createClass({
	render() {
		let props = this.props;

		return (<div className='sidebar'>
			<h2> All Decks </h2>
			<ul>
			{props.decks.map((deck, i) => 
				<li key={i}> {deck.name} </li>
			)}
			</ul>
			{props.addingDeck && <input ref='add' /> }
			</div>);
	}
});

export {App, Sidebar} ;
