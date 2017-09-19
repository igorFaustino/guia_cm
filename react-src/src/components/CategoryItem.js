import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class CategoryItem extends Component {

	render() {
		let link = "/categorias/" + this.props.category.title.toLowerCase();
		return (
			<Col md="4">
				<Link to={link} className="link">
				<Container className="text-center">
					<div className="icons">
						<span className={this.props.category.icon} ></span>
					</div>
					<p>{this.props.category.title}</p>
				</Container>
				</Link>
			</Col>
		);
	}
}

export default CategoryItem;
