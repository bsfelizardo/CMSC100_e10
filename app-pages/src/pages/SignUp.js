import React from 'react';
import Input from './Input';
import '../SignUp.css'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const nameRegex = /^([a-zA-Z]{1,})$/
const passRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/

class SignUp extends React.Component{
	constructor(props){
		super(props)
		this.state={
			fname: "",
			lname: "",
			email: "",
			pass: "",
			repass: "",
			fnWarn: "",
			lnWarn: "",
			eWarn: "",
			pWarn: "",
			rpWarn: "",
			fnValid:false,
			lnValid:false,
			eValid:false,
			pValid:false,
			rpValid:false
		}

		this.changeHandler = this.changeHandler.bind(this)
		this.handleButton = this.handleButton.bind(this)
		this.checkBlank = this.checkBlank.bind(this)
		this.checkPattern = this.checkPattern.bind(this)
	}


	async handleButton(e){
		e.preventDefault()

		await this.checkPattern();
		await this.checkBlank();

		if(this.allInputValid()){
			fetch('http://localhost:3001/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					fname: this.state.fname,
					lname: this.state.lname,
					email: this.state.email,
					pass: this.state.pass
				})
			})
				.then(response => response.json())
				.then(body => {
					if(body.success) {alert("Account saved. Proceed to Sign In"); window.location.href = "http://localhost:3000/"}
					else alert("Failed to save")
				})
		}

	}

	allInputValid(){
		if(!this.state.fnValid) return false
		if(!this.state.lnValid) return false
		if(!this.state.eValid) return false
		if(!this.state.pValid) return false
		if(!this.state.rpValid) return false
		return true
	}

	checkBlank(){
		if(this.state.fname === "") this.setState({fnWarn: "Required", fnValid:false})
		if(this.state.lname === "") this.setState({lnWarn: "Required", lnValid:false})
		if(this.state.email === "") this.setState({eWarn: "Required", eValid:false})
		if(this.state.pass === "") this.setState({pWarn: "Required", pValid:false})
		if(this.state.repass === "") this.setState({rpWarn: "Required", rpValid:false})
	}

	checkPattern(){
		if(nameRegex.test(this.state.fname) === false) this.setState({fnWarn: "Please enter a name", fnValid:false})
		else this.setState({fnWarn: "", fnValid:true})
		if(nameRegex.test(this.state.lname) === false) this.setState({lnWarn: "Please enter a name", lnValid:false})
		else this.setState({lnWarn: "", lnValid:true})
		if(emailRegex.test(this.state.email) === false) this.setState({eWarn: "Please enter a valid email", eValid:false})
		else this.setState({eWarn: "", eValid:true})
		if(passRegex.test(this.state.pass) === true) this.setState({pWarn: "Should be at least 8 chars, have at least 1 number, 1 lowercase letter, and 1 uppercase letter", pValid:false})
		else this.setState({pWarn: "", pValid:true})
		if(this.state.pass !== this.state.repass) this.setState({rpWarn: "Password did not match", rpValid:false})
		else this.setState({rpWarn: "", rpValid:true})
	}

	changeHandler(e){
		e.preventDefault();
		switch(e.target.id){
			case "fname": 
				this.setState({fname: e.target.value});
				break;
			case "lname":
				this.setState({lname: e.target.value})
				break;
			case "email":
				this.setState({email: e.target.value})
				break;
			case "pass":
				this.setState({pass: e.target.value})
				break
			case "repass":
				this.setState({repass: e.target.value})
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
		    		label={"First name"} 
		    		type={"text"}
		    		id={"fname"}
		    		value={this.state.fname}
		    		changeHandler={this.changeHandler}
		    		warning={this.state.fnWarn}
		    		/>
				<Input 
					label={"Last name"} 
		    		type={"text"}
		    		id={"lname"}
		    		value={this.state.lname}
		    		changeHandler={this.changeHandler}
		    		warning={this.state.lnWarn}
					/>
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
				<Input 
					label={"Repeat Password"} 
		    		type={"password"}
		    		id={"repass"}
		    		value={this.state.repass}
		    		changeHandler={this.changeHandler}
		    		warning={this.state.rpWarn}
					/>
    			<button onClick={this.handleButton}>Sign up</button>
   			</div>
		)
	}
}

export default SignUp