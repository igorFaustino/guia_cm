import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import superagent from 'superagent';

import FormService from '../components/FormService';
import ServicoItem from '../components/ServicoItem';

const { alertify } = require('react-alertify-js');

const localStorageAuth = require('../util/localHostAuth.js');

class ListaServicos extends Component {
	constructor(){
		super();
		this.state = {
			filtroservicos: [],
			servico: [],
			modal:false
		}
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount(){
		this.getServicosFromDatabase();
	}

	getServicosFromDatabase(){
		superagent.get('http://localhost:5000/api/services')
		.query({ categoria: categoryFormat(this.props) })
		.set('Content-Type', 'application/json')
		.end((err, response) => {
			this.setState({
				servico: response.body
			});
		});
	}

	saveOnDatabase(servico){
		servico.categoria = categoryFormat(this.props);
		fetch('http://localhost:5000/api/service',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('admin'),
			},
			body: JSON.stringify({
				'nome' : servico.nome, 
				'telefone' : servico.telefone,
				'info' : servico.info,
				'categoria' : servico.categoria
			})
		}).then((response) => response.json()).then((json) => {
			if(json.success){
				console.log(json);
				alert("daora");
				this.setState({
					servico: this.state.servico.concat(json.service),
				});
			}
			else{
				alert("deu ruim");
			}
		});
	}

	deleteFromDatabase(deletedServico){
		fetch('http://localhost:5000/api/service/' + deletedServico._id, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': localStorage.getItem('admin'),
			}
		}).then((response) => response.json()).then((json) => {
			if(json.success){
				alert("daora");
				let servico = this.state.servico;
				servico = servico.filter((servico) => {
					if(servico._id !== deletedServico._id){
						return true;
					}
					return false;
				});
				this.setState({
					servico: servico,
				});
			}
			else{
				alert("deu ruim");
			}
		});	
	}

	handleSubmit(servico){
		this.saveOnDatabase(servico);
		this.toggle();
	}

	handleDelete(servico){
		this.deleteFromDatabase(servico);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render(){
		let servicoItens;
		let categoria = this.props.match.params.servico;
		if(this.state.servico){
			servicoItens = this.state.servico.map(servico => {
				return (
					<ServicoItem key={servico._id} servico={servico} delete={this.handleDelete}/>
				);
			});
		}

		let addButton;
		if(localStorageAuth.thereIsAdim()){
			addButton = <Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>;
		}
		
		return(
			<Container className="text-center content">
				<h1 className="large-space">Lista de Serviços</h1>
				<Col>
					{servicoItens}
				</Col>
				{addButton}

				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader toggle={this.toggle}>Adicionar Servico</ModalHeader>
					<ModalBody>
						<FormService handleSubmit={this.handleSubmit} />
					</ModalBody>
				</Modal>
			</Container>
		);
			
	}
	
}

function categoryFormat(props) {
	let category = props.match.params.servico;
	category = category.replace(/\s+/g, '+');
	return category;
}

export default ListaServicos;