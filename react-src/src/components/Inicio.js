import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import Carrossel from './Carrossel';
import coffe from '../img/cafeteria.jpg';
import atividade from '../img/atividade.jpg';
import domingo from '../img/domingo.jpg';
import sebo from '../img/sebo.jpg';
import banco from '../img/dinheiro.jpg';
import moveis from '../img/moveis.jpg';
import mercado from '../img/mercado.jpg';
import imobiliaria from '../img/imobiliaria.jpg';
import farmacia from '../img/farmacia.jpg';

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

	componentWillMount(){
		this.setState(
			{categories: [
				{
					title: 'Atividades fisicas',
					img: require('../img/atividade.jpg')
				},
				{
					title: 'Comer no Domingo',
					img: require('../img/domingo.jpg')
				},
				{
					title: 'Imobiliária',
					img: require('../img/imobiliaria.jpg')
				},
				{
					title: 'Sebo',
					img: require('../img/sebo.jpg')
				},
				{
					title: 'Hospitais e Farmácias',
					img: require('../img/farmacia.jpg')
				},
				{
					title: 'Banco',
					img: require('../img/dinheiro.jpg')
				},
				{
					title: 'Moveis Usados',
					img: require('../img/moveis.jpg')
				},
				{
					title: 'Mercados baratos',
					img: require('../img/mercado.jpg')
				}
			]
		});
	}
		
	render() {
		let categoryItens;
		if(this.state.categories){
			categoryItens = this.state.categories.map(category => {
				return (
					<CategoryItem key={category.title} category={category} />
				);
			});
		}

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
				<hr className="large-space"/>
				<Row>
					{categoryItens}
				</Row>
			</Container>
			);

		
	}
}

export default Inicio;
