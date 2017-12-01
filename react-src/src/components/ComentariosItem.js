import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';

import img from '../img/rockinrio.jpg';


const localStorageAuth = require('../util/localHostAuth.js');

class ComentariosItem extends Component {
	constructor(){
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(e){
		e.preventDefault();
		this.props.delete(this.props.comentario)
	}

	render() {
		let deleteButton;
		if(localStorageAuth.thereIsAdim()){
			deleteButton = <Button color="danger" className="margin-sides" onClick={this.handleDelete}>Deletar</Button>;
		}

		return (
				<Container className="comentario">
					<Row>
						<Col md="3" xs="12" className="img-eventos">
							<Row>
								<Col md="6">
									{deleteButton}
								</Col>
								<Col md="6">
									<img src={this.props.comentario.userImage} className="rounded" style={{
										height: '40%',
										width: '50%',
									}}></img>
									<h5>{this.props.comentario.user}</h5>
								</Col>
							</Row>
						</Col>
						<Col md="9" xs="12">
							<Container>
								<p>{this.props.comentario.comentario}</p>
							</Container>
						</Col>
					</Row>
				</Container>
			);
	}
}

export default ComentariosItem;