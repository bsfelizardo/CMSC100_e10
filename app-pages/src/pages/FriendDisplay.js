import React from 'react'
import '../FriendDisplay.css'

class FriendDisplay extends React.Component {
	constructor(props){
		super(props)

		this.state={
			fName: "",
			lName: "",
			status: "",
			button: "",
			id: "add-button"
		}
		this.acceptButton = this.acceptButton.bind(this)
		this.buttonClick = this.buttonClick.bind(this)
	}

	componentDidMount() {
		fetch('http://localhost:3001/user-details', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: this.props.id
				})
			})
			.then(response => response.json())
			.then(body => {
				if(body){
					this.setState({fName:body.fName, lName: body.lName})
				}
				console.log(body)
				})
		fetch('http://localhost:3001/friend-status', {
				method: 'POST',
				credentials: "include",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					friendId: this.props.id
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

	rejectButton(e) {
		fetch('http://localhost:3001/delete-request', {
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
			case "add-button": console.log(e.target.className)
			break
			case "requested-button": console.log(e.target.className)
			break
			case "accept-button": this.acceptButton(e)
			break 
			case "friends-button": console.log(e.target.className)
			break
			case "reject-button": this.rejectButton(e)
			default: break
		}
	}

	render(){
		if(this.state.id === "accept-button"){
			return(
				<div className="friend-list-item">
					<a href={"http://localhost:3000/view?i=" + this.props.id}><p>{this.state.fName} {this.state.lName}</p></a>
					<button onClick={this.buttonClick} id={this.props.id} className={this.state.id}>{this.state.status}</button>
					<button onClick={this.buttonClick} id={this.props.id} className="reject-button">Reject</button>
				</div>
			)
		}
		return(
			<div className="friend-list-item">
				<a href={"http://localhost:3000/view?i=" + this.props.id}><p>{this.state.fName} {this.state.lName}</p></a>
				<button onClick={this.buttonClick} id={this.props.id} className={this.state.id}>{this.state.status}</button>
			</div>
		)
	}
}

export default FriendDisplay;