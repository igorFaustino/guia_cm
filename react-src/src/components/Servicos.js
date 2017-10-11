import React, {Component} from 'react';
import { Row, Container } from 'reactstrap';
import ServicosItem from './ServicosItem';
import taxi from '../img/taxi.jpg';
import mudanca from '../img/mudanca.jpg';
import diarista from '../img/diarista.jpg';
import delivery from '../img/delivery.jpeg';
import detetizacao from '../img/detetizacao.jpg';
import encanador from '../img/encanador.jpg';

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
					title: 'Taxi',
					img: require('../img/taxi.jpg')
					
				},
				{
					title: 'Diarísta',
					img: require('../img/diarista.jpg')
					
				},
				{
					title: 'Mudança de Móveis',
					img: require('../img/mudanca.jpg')
					
				},
				{
					title: 'Delivery',
					img: require('../img/delivery.jpeg')
					
				},
				{
					title: 'Encanador',
					img: require('../img/encanador.jpg')
					
				},
				{
					title: 'Detetização',
					img: require('../img/detetizacao.jpg')
					
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