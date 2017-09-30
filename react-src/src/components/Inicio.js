import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import Carrossel from './Carrossel';
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
					icon: 'ion-ios-football'
				},
				{
					title: 'Comer no Domingo',
					icon: 'ion-pizza'
				},
				{
					title: 'Mercados baratos',
					icon: 'ion-ios-cart'
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
