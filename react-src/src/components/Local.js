import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import noImage from '../img/noImage.jpg';
import coffe from '../img/cafeteria.jpg';
import map from '../img/map.jpg';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class Local extends Component {

	render() {
		// let link = "/" + this.props.local.nome.toLowerCase();
		return (
			<Container className="text-center">
				<h1 className="large-space" >LOCAL</h1>
				<Row>
					<Col md="6">
						<img src={coffe} className="figure-img img-fluid rounded"></img>
					</Col>
					<Col md="6">
						<Container className="margin">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							<p>Av blabal bla bla, 124</p>
							<p>12:00 - 22:00</p>
							<Button color="primary" size="lg" block disabled>Acessar site</Button>
						</Container>
					</Col>
				</Row>
				<hr className="large-space" />
				<h3 className="large-space">Como chegar</h3>
				<img src={map} className="figure-img img-fluid rounded"></img>
			</Container>
		);
	}
}

export default Local;
