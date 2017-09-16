import React, { Component } from 'react';
import CategorieItem from './CategorieItem';
import { Row, Container } from 'reactstrap';

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
		let categorieItens;
		if(this.state.categories){
			categorieItens = this.state.categories.map(categorie => {
				return (
					<CategorieItem key={categorie.title} categorie={categorie} />
				);
			});
		}

		return (
			<Container className="text-center">
				<h1 className="large-space">Categorias</h1>
				<Row>
					{categorieItens}
				</Row>
			</Container>
		);
	}
}

export default Categories;
