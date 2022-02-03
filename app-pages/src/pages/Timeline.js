import React from 'react'
import {Redirect} from "react-router-dom"
import Cookies from "universal-cookie"
import Navigation from './Navigation'
import '../Timeline.css'
import Form from './Form'


class Timeline extends React.Component{
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
						alert("Posted");
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

	blank(){
		if(this.state.postbox === "") return false
		else return true
	}

	getPosts() {
		fetch('http://localhost:3001/all-posts',{
				method: 'GET',
				credentials: "include",
			})
			.then(response => response.json())
			.then(body => {
					console.log(body)
					this.setState({posts: body})
				})
	}

	changeHandler(e){
		this.setState({postbox: e.target.value})
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
								<Form
									value={this.state.postbox}
									changeHandler={this.changeHandler}
									handleButton = {this.postButton} 
								/>
								
								<div className="timeline-posts">
								<p id="timeline">Timeline</p>
									{
										this.state.posts.map((post, i) => {
										return <div key={i} className="post">
											<a href={"http://localhost:3000/view?i=" + post.userId}><p id="name">{post.fName} {post.lName}</p></a>
											<br/>
											<p id="content">{post.content}</p>
											<br/>
											<p id="time">{post.timestamp}</p>
											</div>
										})
									}
								</div> 
							</main>

							<aside id="right-side">
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