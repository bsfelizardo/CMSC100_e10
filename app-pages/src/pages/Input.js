import React from 'react';
import '../Input.css'

class Input extends React.Component {

	render(){
		return(
			<div className="input">
		    	<div className="label">
		    		<label>{this.props.label}</label>
		    	</div>
		    	<div className="inputField">
		    		<input 
		    			type={this.props.type}
		    			id={this.props.id}
		    			value={this.props.value}
		    			onChange={this.props.changeHandler}
			    		/>
			    </div>
			    <div>
			    	<span>{this.props.warning}</span>
		    	</div>
   			</div>
		)
	}
}

export default Input;