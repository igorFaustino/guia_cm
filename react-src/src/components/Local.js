import React, { Component } from 'react';
import { Row, Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import noImage from '../img/noImage.jpg';
import coffe from '../img/cafeteria.jpg';
import map from '../img/map.jpg';
import Mapa from './Mapa.js'

import FormLocals from './FormLocals.js';


class Local extends Component {
	constructor(){
		super();
		this.state = {
			modal: false,
			local: {
				nome: 'Local',
				desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				local: 'Av blabal bla bla, 124',
				horario: '12:00 - 22:00',
			}
		}

		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.saveOnDatabase = this.saveOnDatabase.bind(this);
	}

	getLocalsFromDatabase(){

	}

	saveOnDatabase(){
		let local = {
			nome: this.state.local.nome,
			descricao: this.state.local.desc,
			endereco: this.state.local.local,
			horario: this.state.local.horario
		}
		fetch('https://localhost:5000/local/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('admin'),
			},
			body: JSON.stringify(local)
		}).then((response) => {
			if(response.success){
				alert("show");
			} else {
				alert("droga");
			}
		});
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	handleSubmit(local){
		this.setState({
			local: local
		});
		this.toggle();
		// this.saveOnDatabase();
	}

	render() {
		return (
			<Container className="text-center">
				<h1 className="large-space" >{this.state.local.nome}</h1>
				<Row>
					<Col md="6">
						<img src={coffe} className="figure-img img-fluid rounded"></img>
					</Col>
					<Col md="6">
						<Container className="margin">
							<p>{this.state.local.desc}</p>
							<p>{this.state.local.local}</p>
							<p>{this.state.local.horario}</p>
							<Button color="primary" size="lg" block disabled>Acessar site</Button>
						</Container>
					</Col>
				</Row>
				<div className="map-space">
					<hr className="large-space" />
					<h3 className="large-space">Como chegar</h3>
					<Container className="align-center large-space map">
						<Mapa/>
					</Container>
				</div>
				<hr/>
				<Button className="btn-lg large-space" color="primary" onClick={this.toggle}>Editar Local</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader toggle={this.toggle}>Editar Local</ModalHeader>
					<ModalBody>
						<FormLocals value={this.state.local} handleSubmit={this.handleSubmit}/>
					</ModalBody>
				</Modal>
			</Container>
		);
	}
}

export default Local;
