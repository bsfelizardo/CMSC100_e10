import React from 'react'
import {Redirect} from "react-router-dom"
import Cookies from "universal-cookie"
import Navigation from './Navigation'
import '../Profile.css'
import Form from './Form'


class Profile extends React.Component{
	constructor(props) {
		super(props)

		this.state = {
			posts: [],
			postbox: "",

			checkedIfLoggedIn: false,
			isLoggedIn: null,
			fName: localStorage.getItem("fName"),
			lName: localStorage.getItem("lName")
		}

		this.changeHandler = this.changeHandler.bind(this)
		this.postButton = this.postButton.bind(this)
		this.signoutButton = this.signoutButton.bind(this)
		this.blank = this.blank.bind(this)
		this.getPosts = this.getPosts.bind(this)
		this.deletePost = this.deletePost.bind(this)
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
					this.getPosts()
				}
				else this.setState({
					checkedIfLoggedIn: true,
					isLoggedIn: false
				})
			})
	}

	postButton(e){
		e.preventDefault()

		if(this.blank()){
			console.log("sending")
			fetch('http://localhost:3001/add-post',{
				method: 'POST',
				credentials: "include",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fName: this.state.fName,
					lName: this.state.lName,
					content: this.state.postbox
				})
			})
			.then(response => response.json())
			.then(body => {
					if(body.success) {
						this.setState({postbox: ""})
						this.getPosts()
					}
					else alert("Failed to post")
				})
		}
		else console.log("no content")

	}

	signoutButton(e){
		e.preventDefault()

		const cookies = new Cookies()
		cookies.remove("authToken")

		localStorage.removeItem("fName")
		localStorage.removeItem("lName")

		this.setState({isLoggedIn: false})
	}

	getPosts() {
		fetch('http://localhost:3001/all-posts',{
				method: 'GET',
				credentials: "include",
			})
			.then(response => response.json())
			.then(body => {
					this.setState({posts: body})
				})
	}

	blank(){
		if(this.state.postbox === "") return false
		else return true
	}

	changeHandler(e){
		this.setState({postbox: e.target.value})
	}

	deletePost(e){
		e.preventDefault()
		fetch('http://localhost:3001/delete-post',{
			method: 'POST',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: e.target.value
			})
		})
		.then(response => response.json())
		.then(body => {
				if(body.success) {
					console.log("deleted")
					
				}
				else alert("Failed to delete")
				this.getPosts()
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
						<div className="main-row">
							<div className="cover">
								<figure>
									<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="display" id="profile"/>
								</figure>
								<p id="cover-name">{this.state.fName}  {this.state.lName}</p>
							</div>
							<div className="content">
								<aside id="left-side"></aside>
								<div className="posts">
									<Form
									value={this.state.postbox}
									changeHandler={this.changeHandler}
									handleButton = {this.postButton} 
								/>
									<div className="timeline-posts">
									<p id="posts">Posts</p>
									{
										this.state.posts.map((post, i) => {
											if(post.fName === localStorage.getItem("fName") && post.lName === localStorage.getItem("lName")){
												return <div key={i} className="post">
													<p id="name">{post.fName} {post.lName}</p>
													<br/>
													<p>{post.content}</p>
													<br/>
													<p>{post.timestamp}</p>
													<br/>
													<button onClick={this.deletePost} value={post._id}>delete</button>
													</div>
											}
											else return null
										})
									}
								</div> 
								</div>
								<aside id="right-side"></aside>
							</div>
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

export default Profile