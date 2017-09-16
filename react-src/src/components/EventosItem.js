import React, { Component } from 'react';
import { Container } from 'reactstrap';

class EventosItem extends Component {
	render() {
		return (
				<Container className="text-left" src='this.pros.evento.image}'>
					<h3>{this.props.evento.title}</h3>
					<h3>{this.props.evento.local}</h3>
					<h3>{this.props.evento.data}</h3>
					<br/>
				</Container>
			);
	}
}

export default EventosItem;