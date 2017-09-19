import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import { Row, Container } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class Categories extends Component {
	constructor(){
		super();
		this.state = {
			categories: []
		}
	}

	componentWillMount(){
		this.setState(
			{categories: [
				{
					title: 'Lazer',
					icon: 'ion-ios-football'
				},
				{
					title: 'Alimentação',
					icon: 'ion-pizza'
				},
				{
					title: 'Compras',
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

		return (
			<Container className="text-center">
				<h1 className="large-space">Categorias</h1>
				<Row>
					{categoryItens}
				</Row>
			</Container>
		);
	}
}

export default Categories;
