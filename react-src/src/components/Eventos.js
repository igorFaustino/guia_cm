import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  EventosItem from './EventosItem';
import  FormEvents from './FormEvents';

const localStorageAuth = require('../util/localHostAuth.js');

class Eventos extends Component {
	constructor(){
		super();
		this.state = {
			filterEventos: [],
			eventos: [],
			modal: false,
			value: ""
		}
		this.toggle = this.toggle.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount(){
		this.getEventsFromDatabase();
	}

	getEventsFromDatabase(){
		fetch('http://localhost:5000/api/events', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json()).then((json) => {
			this.setState({
				eventos: json
			});
		});
	}

	saveOnDatabase(evento){
		fetch('http://localhost:5000/api/event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'titulo' : evento.titulo,
				'local' : evento.local,
				'data' : evento.data,
				'link' : evento.link
			})
		}).then((response) => response.json()).then((json) => {
			console.log(json);
			if(json.success){
				alert("daora");
			}
			else{
				alert("deu ruim");
			}
		});
	}

	deleteFromDatabase(evento){
		fetch('http://localhost:5000/api/event/' + evento._id, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		}).then((response) => response.json()).then((json) => {
			console.log(json);
			if(json.success){
				alert("daora");
			}
			else{
				alert("deu ruim");
			}
		});
	}

	handleValueChange(e){
		this.setState({value: e.target.value});
	}

	handleSubmit(evento){
		this.setState({
			eventos: this.state.eventos.concat(evento),
			filterEventos: []
		});
		this.saveOnDatabase(evento);
		this.toggle();
	}

	handleDelete(deletedEvento){
		let eventos = this.state.eventos;
		eventos = eventos.filter((evento) => {
			if(evento._id !== deletedEvento._id){
				return true;
			}
		});
		this.setState({
			eventos: eventos,
			filterEventos: []
		});
		this.deleteFromDatabase(deletedEvento);

	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render(){
		let addButton;
		if(localStorageAuth.thereIsAdim()){
			addButton = <Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>;
		}

		let eventos;
		if(this.state.eventos){
			eventos = this.state.eventos.map(evento => {
				return(
					<EventosItem key={evento._id} evento={evento} delete={this.handleDelete}/>
				);
			});
		}

		return(
			<Container className="text-center content">
				<h1 className="large-space">Lista de Eventos</h1>
				<Col>
					{eventos}
				</Col>
				{addButton}

				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader toggle={this.toggle}>Adicionar Evento</ModalHeader>
					<ModalBody>
						<FormEvents handleSubmit={this.handleSubmit} />
					</ModalBody>
				</Modal>
			</Container>
		);
			
	}
	
}

export default Eventos;