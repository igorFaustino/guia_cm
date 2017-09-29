import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import Carrossel from './Carrossel';
import { Row, Col, Container, Button } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class Inicio extends Component {
	constructor(){
		super();
		this.state = {
		}
	}

		
	render() {
		return(
			<Container>
			<Row>
				<Col md="6">
					<Carrossel>
					</Carrossel>
				</Col>
				<Col md="6">
					<h1>LOCAL</h1>
				Amet aliqua pariatur voluptate laboris anim officia sit in reprehenderit veniam aute cupidatat sunt ut consectetur reprehenderit laborum in ullamco eu nostrud fugiat excepteur deserunt dolor deserunt
				</Col>
			</Row>

			</Container>
			);

		
	}
}

export default Inicio;
