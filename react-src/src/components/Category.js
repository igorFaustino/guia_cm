import React, { Component } from 'react';
import { InputGroup, Row, Col, Container, Input, InputGroupButton, InputGroupAddon, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Local from './LocalsItem.js';
import FormLocals from './FormLocals.js';

class Category extends Component {
	constructor(){
		super();
		this.state = {
			allLocals: [],
			filterLocals: [],
			locals: [],
			modal: false,
			value: ""
		}
		this.toggle = this.toggle.bind(this);
		this.search = this.search.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
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

	handleValueChange(e){
		var allLocals = this.state.allLocals;
		this.setState({value: e.target.value});
	}

	search(e) {
		e.preventDefault();
		var value = this.state.value
		if(this.state.locals){
			var locals = this.state.locals.map(local => {
				return local;
			});
			locals = locals.filter(local => {
				if (local.nome.toUpperCase().indexOf(value.toUpperCase()) > -1) {
					console.log(local);
					return local;
				}
			});
			this.setState({
				filterLocals: locals
			})
		}
		return 0;
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		let category = categoryTitle(this.props);
		let locals;
		// let filterLocals;
		if(this.state.filterLocals.length > 0){
			locals = this.state.filterLocals.map(local => {
				return (
					<Local key={local.nome} local={local} />
				);
			});
		} else {
			locals = this.state.locals.map(local => {
				return (
					<Local key={local.nome} local={local} />
				);
			});	
		}
		return (
			<Container className="content">
				<h1 className="text-center large-space">{category}</h1>
				<form className="input-group large-space">
					<input type="text" className="form-control" placeholder="Buscar..." value={this.state.value} onChange={this.handleValueChange} />
					<span className="input-group-btn">
						<input className="btn btn-primary" onClick={this.search} value="ir!" type="submit" />
					</span>
				</form>
				<Row>
					{locals}
				</Row>
				<Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader toggle={this.toggle}>Adicionar Local</ModalHeader>
					<ModalBody>
						<FormLocals />
					</ModalBody>
				</Modal>
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