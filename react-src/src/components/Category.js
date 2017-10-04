import React, { Component } from 'react';
import { InputGroup, Row, Col, Container, Input, InputGroupButton, InputGroupAddon, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Local from './LocalsItem.js';
import FormLocals from './FormLocals.js';

class Category extends Component {
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
		});
	}

	saveOnDatabase(local){
		fetch('http://localhost:5000/api/local', {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				'nome': local.nome,
				'descricao': local.desc,
				'endereco': local.local,
				'horario': local.horario
			})
		}).then((response) => response.json()).then((json) => {
			console.log(json);
			if(json.success){
				alert("show");
			} else {
				alert("droga");
			}
		});
	}

	deleteFromDatabase(local){
		fetch('http://localhost:5000/api/local/' + local._id, {
			method: 'DELETE',
			// mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
		}).then((response) => response.json()).then((json) => {
			console.log(json);
			if(json.success){
				alert("show");
			} else {
				alert("droga");
			}
		});
	}


	handleValueChange(e){
		this.setState({value: e.target.value});
	}

	handleSubmit(local){
		this.setState({
			locals: this.state.locals.concat(local),
			filterLocals: []
		});
		this.saveOnDatabase(local);
		this.toggle();
	}

	handleDelete(deletedLocal){
		let locals = this.state.locals;
		locals = locals.filter((local)=>{
			if(local._id !== deletedLocal._id){
				return true;
			}
		});
		this.setState({
			locals: locals,
			filterLocals: []
		});
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

export default Category;