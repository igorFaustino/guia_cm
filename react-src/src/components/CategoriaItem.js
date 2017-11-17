import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class CategoriaItem extends Component {

	render() {
		let link = this.props.link + this.props.category.nome.toLowerCase();
		return (
			<Col lg="3" md="4" sm="6" xs="12">
				<Link to={link} className="link">
				<Container className="text-center">
					<div>
						<img src={this.props.category.img} className="figure-img img-fluid rounded format" style={{
							maxHeight: 150
						}}/>
					</div>
					<p>{this.props.category.nome}</p>
				</Container>
				</Link>
			</Col>
		);
	}
}

export default CategoriaItem;
