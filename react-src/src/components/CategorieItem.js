import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';

class CategorieItem extends Component {

	render() {
		return (
			<Col md="4">
				<Container className="text-center">
					<div className="icons">
						<span className={this.props.categorie.icon} ></span>
					</div>
					<p>{this.props.categorie.title}</p>
				</Container>
			</Col>
		);
	}
}

export default CategorieItem;
