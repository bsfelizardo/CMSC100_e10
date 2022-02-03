import React from 'react'
import Input from './Input'
import Cookies from "universal-cookie"
import '../SignIn.css'



class SignIn extends React.Component{
	constructor(props){
		super(props)
		this.state={
			email: "",
			pass: "",
			eWarn: "",
			pWarn: "",
			eValid: false,
			pValid: false,
			matchWarn: ""
		}

		this.changeHandler = this.changeHandler.bind(this)
		this.handleButton = this.handleButton.bind(this)
		this.checkBlank = this.checkBlank.bind(this)
	}

	async handleButton(e){
		e.preventDefault()

		await this.checkBlank();

		if(this.allInputValid()){
			fetch('http://localhost:3001/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.pass
				})
			})
				.then(response => response.json())
				.then(body => {
					if(body.success) {
						const cookies = new Cookies()

						cookies.set(
							"authToken",
							body.token,
							{
								path: "localhost:3001/",
								age: 60*60,
								samSite: "lax"
							})

						localStorage.setItem("fName", body.fName)
						localStorage.setItem("lName", body.lName)
						localStorage.setItem("search", "")
						window.location.href = "http://localhost:3000/";
					}
					else alert("Failed to log in")
				})
		}
	}

	allInputValid(){
		if(!this.state.eValid) return false
		if(!this.state.pValid) return false
		return true
	}

	checkBlank(){
		if(this.state.email === "") this.setState({eWarn: "Required", eValid:false})
			else this.setState({eWarn: "", eValid:true})
		if(this.state.pass === "") this.setState({pWarn: "Required", pValid:false})
			else this.setState({pWarn: "", pValid:true})
		}


	changeHandler(e){
		e.preventDefault()
		switch(e.target.id){
			case "email":
				this.setState({email: e.target.value})
				break;
			case "pass":
				this.setState({pass: e.target.value})
				break
			default:break;
		}
	}

	getValue(key){
		return(this.state.key)
	}


	render(){

		return(

			<div className="main">
				<Input 
		    		label={"Email"} 
		    		type={"email"}
		    		id={"email"}
		    		value={this.state.email}
		    		changeHandler={this.changeHandler}
		    		warning={this.state.eWarn}
		    		/>
		    	<Input
					label={"Password"} 
		    		type={"password"}
		    		id={"pass"}
		    		value={this.state.pass}
		    		changeHandler={this.changeHandler}
		    		warning={this.state.pWarn}
					/>

				<button onClick={this.handleButton}>Sign In</button>
				<br />
				<a href="http://localhost:3000/signup">signup</a>
				<br/>
				<span>{this.state.matchWarn}</span>
			</div>
			)
	}
}

export default SignIn 