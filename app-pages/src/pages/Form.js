import React from 'react'
import '../Form.css'

class Form extends React.Component{

	render(){
		return(
			<div className="form">
            	<p id="create-post">Create Post</p>
				<label>
					<textarea 
					className="textArea" 
					placeholder="What's new?"
					value={this.props.value}
					onChange={this.props.changeHandler}
					>

					</textarea>
				</label>
			
				<button className="button" onClick={this.props.handleButton}>Post</button>
          	</div>
		)
	}
}

export default Form