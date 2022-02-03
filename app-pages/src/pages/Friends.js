import React from 'react'
import {Redirect} from "react-router-dom"
import Cookies from "universal-cookie"
import Navigation from './Navigation'
import FriendDisplay from './FriendDisplay'
import '../Friends.css'


class Timeline extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			friends: [],
			fReqs: [],


			checkedIfLoggedIn: false,
			isLoggedIn: null,
			fName: localStorage.getItem("fName"),
			lName: localStorage.getItem("lName")
		}

		this.signoutButton = this.signoutButton.bind(this)
		this.getFriends = this.getFriends.bind(this)
		this.getRequests = this.getRequests.bind(this)
	}

	componentDidMount() {
		fetch('http://localhost:3001/checkifloggedin', {
			method: 'POST',
			credentials: "include"
		})
			.then(response => response.json())
			.then(body => {
				if(body.isLoggedIn){
					this.setState({
						checkedIfLoggedIn: true,
						isLoggedIn: true, 
						fName: localStorage.getItem("fName"),
						lName: localStorage.getItem("lName")
					})
					this.getFriends()
					this.getRequests()
				}
				else this.setState({
					checkedIfLoggedIn: true,
					isLoggedIn: false
				})
			})
	}


	signoutButton(e){
		e.preventDefault()

		const cookies = new Cookies()
		cookies.remove("authToken")

		localStorage.removeItem("fName")
		localStorage.removeItem("lName")

		this.setState({isLoggedIn: false})
	}


	getFriends() {
		fetch('http://localhost:3001/all-friends',{
				method: 'GET',
				credentials: "include",
			})
			.then(response => response.json())
			.then(body => {
					if(body){
						this.setState({friends:body})
						console.log(this.state.friends)
					}
				})
	}

	getRequests() {
		fetch('http://localhost:3001/all-requests',{
				method: 'GET',
				credentials: "include",
			})
			.then(response => response.json())
			.then(body => {
					if(body){
						this.setState({fReqs:body})
						console.log(this.state.fReqs)
					}
				})
	}



	render(){
		if(!this.state.checkedIfLoggedIn){
			return (<div></div>)
		}
		else{
			if(this.state.isLoggedIn){
				return(
					<div className = "main">
						<Navigation onClick={this.signoutButton}/>
						<div className="mainRow">

							<aside id="left-side">
								<figure>
									<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="display"/>
								</figure>
								<h3>{this.state.fName}  {this.state.lName}</h3>
							</aside>

							<main>
								<div className="friends-list">
									<p id="friends">Friends</p>
									{
										this.state.friends.map((friends, i) => {
												return (
													<FriendDisplay key={i} id={friends.friend}/>
													)
										})
									}
								</div>
								<div className="friend-requests">
								<p id="friends">Requests</p>
								{
										this.state.fReqs.map((friends, i) => {
												return (
													<FriendDisplay key={i} id={friends.friend}/>
													)
										})
									}
								</div> 
							</main>

							<aside id="right-side">
							right side
							</aside>
						</div>
					</div>
				)
			}
			else{
				return <Redirect to="/signin"/>
			}
		}
		
	}
}

export default Timeline 