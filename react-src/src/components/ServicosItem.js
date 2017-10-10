import React, { Component } from 'react';
import { Row, Col, Container} from 'reactstrap';
import Lista from './Lista';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class ServicosItem extends Component {

	render() {
		let link = "/servicos/" + this.props.servicos.title.toLowerCase();
		return (
			<Col sm="4">
				<Link to={link} className="link">
				<Container className="text-center">
					<div className="icons">
						<span className={this.props.servicos.icon} ></span>
					</div>
					<p>{this.props.servicos.title}</p>
				</Container>
				</Link>
			</Col>
		);
	}
}

				
export default ServicosItem;