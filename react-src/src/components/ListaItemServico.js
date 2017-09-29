import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class ServicoItem extends Component {
	render() {
		let link = "/servicos/" + this.props.servico.nome.toLowerCase();
		return (
				<Container>
					<Row>
						<Col md="6">
							<Container>
									<h3>{this.props.servico.nome}</h3>
									<h3>{this.props.servico.telefone}</h3>
									<h3>{this.props.servico.descricao}</h3>
								
							</Container>
						</Col>
					</Row>
					<hr/>
				</Container>
			);
	}
}

export default ServicoItem;