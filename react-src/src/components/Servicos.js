import React, {Component} from 'react';
import { Row, Container } from 'reactstrap';
import ServicosItem from './ServicosItem';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class Servicos extends Component {
	constructor(){
		super();
		this.state = {
			servicos: []
		}
	}

componentWillMount(){
		this.setState(
			{servicos: [
				{
					title: 'Lugares Baratos',
					
				},
				{
					title: 'Farmacias 24 Horas',
					
				},
				{
					title: 'Imobiliaria',
					
				},
				{
					title: 'Comida de Madrugada ',
					
				},
				{
					title: 'Mercados',
					
				},
				{
					title: 'Pizzarias',
					
				}
			]
		});
	}

render() {
		let servicosItens;
		if(this.state.servicos){
			servicosItens = this.state.servicos.map(servicos => {
				return (
					<ServicosItem key={servicos.title} servicos={servicos} />
				);
			});
		}

		return (
			<Container className="text-center">
				<h1 className="large-space">Serviços</h1>
				<Row>
					{servicosItens}
				</Row>

			</Container>
		);
	}
}

export default Servicos;