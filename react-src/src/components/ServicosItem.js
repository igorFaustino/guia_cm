import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
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
			<Col md="4">
				<Link to={link} className="link">
				<Container className="text-center">
					<h1 classname="large-space">
					<Button color="secondary" size="lg" onClick={this.toggle}>{this.props.servicos.title}</Button>
		 			</h1>
				</Container>
				</Link>
			</Col>
		);
	}
}

export default ServicosItem;