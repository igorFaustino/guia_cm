import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import noImage from '../img/noImage.jpg';
import coffe from '../img/cafeteria.jpg';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class Local extends Component {

	render() {
		let link = "/categorias/" + this.props.local.nome.toLowerCase();
		return (
			<Col md='4'>
				<Link to={link} className="link">
					<figure className="figure">
						<img src={coffe} alt="..." className="figure-img img-fluid rounded"></img>
						<figcaption class="figure-caption">
							<div className="text-center">
								<h3>{this.props.local.nome}</h3>
								<p>{this.props.local.descricao}</p>
								<p>{this.props.local.horario}</p>
								<p>{this.props.local.endereco}</p>
							</div>
						</figcaption>
					</figure>
				</Link>
			</Col>
		);
	}
}

export default Local;
