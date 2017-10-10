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
					title: 'Taxi',
					icon: 'ion-android-bus'
					
				},
				{
					title: 'Diarísta',
					icon: 'ion-android-walk'
					
				},
				{
					title: 'Mudança de Móveis',
					icon: 'ion-android-archive'
					
				},
				{
					title: 'Delivery',
					icon: 'ion-android-restaurant'
					
				},
				{
					title: 'Encanador',
					icon: 'ion-wrench'
					
				},
				{
					title: 'Detetização',
					icon: 'ion-bug'
					
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