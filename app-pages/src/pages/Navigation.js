import React from 'react'
import '../Navigation.css'


class Navigation extends React.Component{

	render(){
		return(

			<div className="navBar">
				<nav>
					<a href="http://localhost:3000/profile">Profile</a>
					<a href="http://localhost:3000/">Timeline</a>
					<a href="http://localhost:3000/friends">Friends</a>
					<a href="http://localhost:3000/search">Search</a>
				</nav>
				<button onClick={this.props.onClick}>Signout</button>
			</div>
			)
	}
}
export default Navigation