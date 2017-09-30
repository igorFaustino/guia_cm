import React, { Component } from 'react';
import { Row, Col, Container, Button, Card, CardText, CardBlock, CardTitle, CardSubtitle} from 'reactstrap';
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
					<h1 className="large-space">
					<Card onClick={this.toggle} style={{ backgroundColor: '#333', borderColor: '#333'}}>
        				<CardBlock class="large-size">   				
				          <CardTitle>{this.props.servicos.title}</CardTitle>
           				</CardBlock>
      				</Card>
      				</h1>
      				</Container>
				</Link>
			</Col>
		);
	}
}

				
export default ServicosItem;