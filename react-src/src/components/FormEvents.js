import React, { Component } from 'react';
import { Col, Container, Button , InputGroup, Input} from 'reactstrap';

class FormEvents extends Component {
	constructor(){
		super();
		this.state = {
			
		}
	}
	componentWillMount(){

	}

	render(){
		return(
			<form>
				<InputGroup className="small-space">
					<Input placeholder="Titulo do Evento" />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Data do evento" />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Local do Evento" />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Hora do Evento" />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Link do Evento" />
				</InputGroup>
				<div className="text-center">
					<Button color="success" >Adicionar</Button>
				</div>
			</form>
		);
			
	}
	
}

export default FormEvents;