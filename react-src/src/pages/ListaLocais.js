import React, { Component } from 'react';
import {  Row, Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import Local from '../components/LocalsItem.js';
import FormLocals from '../components/FormLocals.js';

const localStorageAuth = require('../util/localHostAuth.js');

class ListaLocais extends Component {
	constructor(){
		super();
		this.state = {
			filterLocals: [],
			locals: [],
			modal: false,
			value: ""
		}
		this.toggle = this.toggle.bind(this);
		this.search = this.search.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

		this.getLocalsFromDatabase = this.getLocalsFromDatabase.bind(this);
		this.saveOnDatabase = this.saveOnDatabase.bind(this);
	}

	componentWillMount(){
		this.getLocalsFromDatabase();
	}

	getLocalsFromDatabase(){
		fetch('http://localhost:5000/api/locals', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		}).then((response) => response.json()).then((json) => {
			this.setState({
				locals: json
			});
			console.log(json);
		});
	}

	saveOnDatabase(local){
		fetch('http://localhost:5000/api/local', {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': localStorage.getItem('admin'),
			},
			body: JSON.stringify({
				'nome': local.nome,
				'descricao': local.desc,
				'endereco': local.endereco,
				'horario': local.horario,
				'image': local.image,
				'cordenadas': local.coordenadas,
			})
		}).then((response) => response.json()).then((json) => {
			if(json.success){
				this.setState({
					locals: this.state.locals.concat(json.local),
					filterLocals: []
				});
				alert("show");
			} else {
				alert("droga");
			}
		});
	}

	deleteFromDatabase(deletedLocal){
		fetch('http://localhost:5000/api/local/' + deletedLocal._id, {
			method: 'DELETE',
			// mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': localStorage.getItem('admin'),
			},
		}).then((response) => response.json()).then((json) => {
			if(json.success){
				alert("show");
				let locals = this.state.locals;
				locals = locals.filter((local)=>{
					if(local._id !== deletedLocal._id){
						return true;
					}
					return false;
				});
				this.setState({
					locals: locals,
					filterLocals: []
				});
			} else {
				alert("droga");
			}
		});
	}


	handleValueChange(e){
		this.setState({value: e.target.value});
	}

	handleSubmit(local){
		this.saveOnDatabase(local);
		this.toggle();
	}

	handleDelete(deletedLocal){

		this.deleteFromDatabase(deletedLocal);
	}

	search(e) {
		e.preventDefault()
		let value = this.state.value
		if(this.state.locals){
			let locals = this.state.locals.map(local => {
				return local;
			});
			locals = locals.filter(local => {
				if (local.nome.toUpperCase().indexOf(value.toUpperCase()) > -1) {
					return local;
				}
				return false;
			});
			if(locals.length > 0){
				this.setState({
					filterLocals: locals,
					value: ''
				})
			} else {
				this.setState({
					value: ''
				})
				alert('Lugar não encontrado');
			}
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
					<Local key={local._id} local={local} delete={this.handleDelete}/>
				);
			});	
		}

		// add button
		let addButton;
		if(localStorageAuth.thereIsAdim()){
			addButton = <Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>;
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
				{addButton}

				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader toggle={this.toggle}>Adicionar Local</ModalHeader>
					<ModalBody>
						<FormLocals handleSubmit={this.handleSubmit} />
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

export default ListaLocais;