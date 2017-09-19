import React, { Component } from 'react';
import { InputGroup, Row, Col, Container, Input, InputGroupButton, InputGroupAddon, Button } from 'reactstrap';

import Local from './Local.js';

class Category extends Component {
	constructor(){
		super();
		this.state = {
			locals: []
		}
	}

	componentWillMount(){
		this.setState({
			locals: [
				{
					nome: 'Lugar',
					endereco: 'End',
					descricao: 'blabla',
					horario: '12:00-23:00',
					categoria: this.props.match.params.categoria
				},
				{
					nome: 'Lugar2',
					endereco: 'End2',
					descricao: 'blabla',
					horario: '12:00-23:00',
					categoria: this.props.match.params.categoria
				},
				{
					nome: 'Lugar3',
					endereco: 'End2',
					descricao: 'blabla',
					horario: '12:00-23:00',
					categoria: this.props.match.params.categoria
				},
				{
					nome: 'Lugar4',
					endereco: 'End',
					descricao: 'blabla',
					horario: '12:00-23:00',
					categoria: this.props.match.params.categoria
				},
				{
					nome: 'Lugar5',
					endereco: 'End2',
					descricao: 'blabla',
					horario: '12:00-23:00',
					categoria: this.props.match.params.categoria
				},
				{
					nome: 'Lugar6',
					endereco: 'End2',
					descricao: 'blabla',
					horario: '12:00-23:00',
					categoria: this.props.match.params.categoria
				}
			]
		});
	}

	render() {
		let category = categoryTitle(this.props);
		let locals;
		if(this.state.locals){
			locals = this.state.locals.map(local => {
				return (
					<Local key={local.nome} local={local} />
				);
			});
		}
		return (
			<Container>
				<h1 className="text-center large-space">{category}</h1>
				<form>
					<InputGroup className="large-space">
						<Input placeholder="Pesquisar.."></Input>
						<InputGroupButton color="primary">ir</InputGroupButton>
					</InputGroup>
				</form>
				<Row>
					{locals}
				</Row>
			</Container>
		);
	}
}

function categoryTitle(props) {
	let category = props.match.params.categoria;
	category = category[0].toUpperCase() + category.slice(1,);
	return category;
}

export default Category;