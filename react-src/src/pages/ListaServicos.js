import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormService from '../components/FormService';
import ServicoItem from '../components/ServicoItem';

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
		this.getServicosFromDatabase = this.getServicosFromDatabase.bind(this);
	}

	componentWillMount(){
		this.getServicosFromDatabase();
	}

	getServicosFromDatabase(){
		fetch('http://localhost:5000/api/services',{
			method: 'GET',
			headers:{
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json()).then((json) => {
			this.setState({
				servico: json
			});
		});
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
					<ServicoItem key={servico.nome} servico={servico}/>
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
						<FormService/>
					</ModalBody>
				</Modal>
			</Container>
		);
			
	}
	
}

export default ListaServicos;