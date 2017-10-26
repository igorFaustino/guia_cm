import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import { Row, Container } from 'reactstrap';

// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Link
// } from 'react-router-dom'

class Categories extends Component {
	constructor(){
		super();
		this.state = {
			categories: []
		}
	}

	componentWillMount(){
		this.setState({
			categories: this.props.categories
		});
	}
	
	render() {
		let categoryItens;
		if(this.state.categories){
			categoryItens = this.state.categories.map(category => {
				return (
					<CategoryItem key={category.nome} category={category} link={this.props.link}/>
				);
			});
		}

		return (
			<Container className="text-center">
				<h1 className="large-space">Categorias de {this.props.nome}</h1>
				<Row>
					{categoryItens}
				</Row>
			</Container>
		);
	}
}

export default Categories;
