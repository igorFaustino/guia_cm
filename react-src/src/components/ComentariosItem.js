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
							<img src={this.props.comentario.userImage} className="rounded" style={{
								height: '50%',
    							width: '10%',
							}}></img>
							<h5>{this.props.comentario.user}</h5>
						</Col>
						<Col md="6">
							<Container>
								<p>{this.props.comentario.comentario}</p>
							</Container>
						</Col>
					</Row>
					<hr/>
				</Container>
			);
	}
}

export default ComentariosItem;