import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';

import img from '../img/rockinrio.jpg';


const localStorageAuth = require('../util/localHostAuth.js');

class EventosItem extends Component {
	constructor(){
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(e){
		e.preventDefault();
		this.props.delete(this.props.evento)
	}

	render() {
		let deleteButton;
		if(localStorageAuth.thereIsAdim()){
			deleteButton = <Button color="danger" className="margin-sides" onClick={this.handleDelete}>Deletar</Button>;
		}

		return (
				<Container>
					<Row>
						<Col md="6" className="img-eventos">
							{deleteButton}
							<img src={img} className="rounded"></img>
						</Col>
						<Col md="6">
							<Container>
								<h3>{this.props.evento.titulo}</h3>
								<h3>{this.props.evento.local}</h3>
								<h3>{this.props.evento.data}</h3>
								<Button color="primary" size="lg" block>Acesse o site oficial</Button>
							</Container>
						</Col>
					</Row>
					<hr/>
				</Container>
			);
	}
}

export default EventosItem;