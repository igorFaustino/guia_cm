import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import noImage from '../img/noImage.jpg';
import coffe from '../img/cafeteria.jpg';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class LocalsItem extends Component {
	constructor(){
		super();

		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(e){
		e.preventDefault();
		console.log(this.props.local);
		this.props.delete(this.props.local)
	}

	render() {
		let link = "/local/" + this.props.local.nome.toLowerCase();
		return (
			<Col xs="12" sm="6" md="4">
				<figure className="figure">
					<Link to={link} className="link">
						<img src={coffe} alt="..." className="figure-img img-fluid rounded"></img>
					</Link>
					<figcaption className="figure-caption">
						<Link to={link} className="link">
							<div className="text-center">
								<h3>{this.props.local.nome}</h3>
								<p>{this.props.local.horario}</p>
								<p>{this.props.local.endereco}</p>
							</div>
						</Link>
						<Button color="danger" className="align-center" onClick={this.handleDelete} >Deletar</Button>
					</figcaption>
				</figure>
			</Col>
		);
	}
}

export default LocalsItem;
