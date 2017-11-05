import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

const localStorageAuth = require('../util/localHostAuth.js');

class ServicoItem extends Component {
	constructor(){
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(e){
		e.preventDefault();
		this.props.delete(this.props.servico);
	}
	
	render() {
		let deleteButton;
		if(localStorageAuth.thereIsAdim()){
			deleteButton = <Button color="danger" className="margin-sides" onClick={this.handleDelete}>Deletar</Button>;
		}

		return (
				<Container>
					<Row>
						<Col md="2" className="margin-top">
							{deleteButton}
						</Col>
						<Col md="4">
							<Container className="text-center">
								<h3>{this.props.servico.nome}</h3>
								<h3>{this.props.servico.telefone}</h3>						
							</Container>
						</Col>
						<Col md="6">
							<h3>{this.props.servico.info}</h3>
						</Col>
					</Row>
					<hr/>
				</Container>
			);
	}
}

export default ServicoItem;