import React from 'react'
import '../Input.css'
import '../Search.css'

class SearchResults extends React.Component {
	constructor(props){
		super(props)

		this.state={
			status: "",
			button: "",
			id: "add-button"
		}

		this.addButton = this.addButton.bind(this)
		this.acceptButton = this.acceptButton.bind(this)
		this.buttonClick = this.buttonClick.bind(this)
	}

	componentDidMount() {
		fetch('http://localhost:3001/friend-status', {
				method: 'POST',
				credentials: "include",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					friendId: this.props.resultId
				})
			})
			.then(response => response.json())
			.then(body => {

				if(body[0]){
					if(body[0].status === "Friends"){this.setState({id:"friends-button"});this.setState({status:body[0].status})}
					if(body[0].status === "Requested"){this.setState({id:"requested-button"});this.setState({status:body[0].status})}
					if(body[0].status === "Accept"){this.setState({id:"accept-button"});this.setState({status:body[0].status})}
				}
				else{this.setState({id:"add-button"});this.setState({status:"Add"})
				}
				})
	}

	addButton(e){
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
			.then(response => response.json())
			.then(body => {
				if(body.success){
					window.location.reload()
				}
				})
	}

	acceptButton(e){
		fetch('http://localhost:3001/accept-request', {
			method: 'POST',
			credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				friendId:e.target.id
			})
		})
			.then(response => response.json())
			.then(body => {
				console.log(body)
				if(body.ok){
					window.location.reload()
				}
				})
	}

	buttonClick(e){
		switch (e.target.className){
			case "add-button": this.addButton(e)
			break
			case "requested-button": console.log(e.target.className)
			break
			case "accept-button": this.acceptButton(e)
			break 
			case "friends-button": console.log(e.target.className)
			break
			default: break
		}
	}

	render(){
		if(this.state.id === "accept-button"){
			return(
				<div className="result">
					<a href={"http://localhost:3000/view?i=" + this.props.resultId}><p>{this.props.fName} {this.props.lName}</p></a>
					<button onClick={this.buttonClick} id={this.props.resultId} className={this.state.id}>{this.state.status}</button>
					<button onClick={this.buttonClick} id={this.props.resultId} className="reject-button">Reject</button>
				</div>
			)
		}
		return(
			<div className="result">
				<a href={"http://localhost:3000/view?i=" + this.props.resultId}><p>{this.props.fName} {this.props.lName}</p></a>
				<button onClick={this.buttonClick} id={this.props.resultId} className={this.state.id}>{this.state.status}</button>
			</div>
		)
	}
}

export default SearchResults;