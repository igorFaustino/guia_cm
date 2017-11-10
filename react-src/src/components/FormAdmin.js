import React, { Component } from 'react';
import { Button , InputGroup, Input} from 'reactstrap';
var classNames = require('classnames');

class FormEvents extends Component {
	constructor(){
		super();
		this.state = {
			email: '',
		}
		var email;

		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentWillMount(){

	}

	handleEmailChange(e){
		this.setState({email: e.target.value});
		if(e.target.value === ''){
			this.email = false;
		} else {
			this.email = true;
		}
	}

	handleSubmit(e){
		e.preventDefault();
		var admin = {
			email: this.state.email,
		}
		this.props.handleSubmit(admin);
	}

	render(){
		var validationEmail = classNames({
			'is-valid': this.email && this.email !== undefined,
			'is-invalid': !this.email && this.email !== undefined,
		});

		return(
			<form>
				<InputGroup className="small-space">
					<Input placeholder="Email do novo admin" value={this.state.email} onChange={this.handleEmailChange}
					className={validationEmail}/>
				</InputGroup>
				<div className="text-center">
					<input className="btn btn-lg btn-success" type="submit" value="Submit" onClick={this.handleSubmit} 
					disabled={!this.email} />
				</div>
			</form>
		);
			
	}
	
}

export default FormEvents;