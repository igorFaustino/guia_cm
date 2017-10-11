import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class CategoryItem extends Component {

	render() {
		let link = "/localidades/" + this.props.category.title.toLowerCase();
		return (
			<Col md="4">
				<Link to={link} className="link">
				<Container className="text-center">
					<div>
						<img src={this.props.category.img} className="figure-img img-fluid rounded format"/>
					</div>
					<p>{this.props.category.title}</p>
				</Container>
				</Link>
			</Col>
		);
	}
}

export default CategoryItem;
