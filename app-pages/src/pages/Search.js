import React from 'react'
import {Redirect} from "react-router-dom"
import Cookies from "universal-cookie"
import Navigation from "./Navigation"
import Input from './Input'
import SearchResults from './SearchResults'
import '../SearchResults.css'



class Search extends React.Component{
	constructor(props){
		super(props)

		this.state={
			checkedIfLoggedIn: false,
			isLoggedIn: null,
			searchResults: [],
			search: "",
			status: []
		}

		this.searchButton = this.searchButton.bind(this)
		this.changeHandler = this.changeHandler.bind(this)
		this.blank = this.blank.bind(this)
		this.signoutButton = this.signoutButton.bind(this)
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
						isLoggedIn: true
					})
					if(localStorage.getItem("search") !== ""){
						this.setState({search: localStorage.getItem("search")})
						console.log(typeof localStorage.getItem("search"))
						this.searchButton()
					}
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

	searchButton(e) {
		if(e) e.preventDefault()

		if(this.blank()){
			var first = this.state.search.split(" ")[0]

			fetch('http://localhost:3001/search?s='+first)
				.then(response => response.json())
				.then(body => {
					if(body.success){
						this.setState({searchResults: body.list})
						localStorage.setItem("search", first)
					}
					})
			}
		else {localStorage.setItem("search", "");window.location.reload()}

		}

	blank(){
		if(this.state.search === "") return false
		else return true
	}

	changeHandler(e){
		e.preventDefault()
		this.setState({search: e.target.value})
	}

	sendRequest(e){
		e.preventDefault()
		fetch('http://localhost:3001/send-request', {
			method: 'POST',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				friendId:e.target.id
			})
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
								<h3>{localStorage.fName}  {localStorage.lName}</h3>
							</aside>

							<main>
								<nav className="search">
									<button onClick={this.searchButton}>Search</button>
									<Input
									label={""} 
						    		type={"Text"}
						    		id={"search"}
						    		value={this.state.search}
						    		changeHandler={this.changeHandler}
						    		warning={""}/>
								</nav>
								<div className="results">
									{
										this.state.searchResults.map((result, i) => {
											if(result.fName !== localStorage.getItem("fName")|| result.lName !== localStorage.getItem("lName")){
												return (
													<SearchResults key={i} fName={result.fName} lName={result.lName} resultId={result._id}/>
													)
												
											}
											else return null
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
				return <Redirect to="/"/>
			}
		}			
	}
}

export default Search 