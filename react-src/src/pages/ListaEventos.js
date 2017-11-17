import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import  EventosItem from '../components/EventosItem';
import  FormEvents from '../components/FormEvents';

const localStorageAuth = require('../util/localHostAuth.js');

class ListaEventos extends Component {
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
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('admin'),
			},
			body: JSON.stringify({
				'titulo' : evento.titulo,
				'local' : evento.local,
				'data' : evento.data,
				'link' : evento.link,
				'image': evento.image
			})
		}).then((response) => response.json()).then((json) => {
			if(json.success){
				alert("daora");
				this.setState({
					eventos: this.state.eventos.concat(evento),
					filterEventos: []
				});
			}
			else{
				alert("deu ruim");
			}
		});
	}

	deleteFromDatabase(deletedEvento){
		fetch('http://localhost:5000/api/event/' + deletedEvento._id, {
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
				let eventos = this.state.eventos;
				eventos = eventos.filter((evento) => {
					if(evento._id !== deletedEvento._id){
						return true;
					}
					return false;
				});
				this.setState({
					eventos: eventos,
					filterEventos: []
				});
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
		this.saveOnDatabase(evento);
		this.toggle();
	}

	handleDelete(deletedEvento){
		this.deleteFromDatabase(deletedEvento);

	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render(){
		this.state.eventos.sort(function(a,b){
			let aa = a.data.split("/");
			let dataa = new Date(aa[2] + "-" + aa[1] + "-" + aa[0]);
			let bb = b.data.split("/");
			let datab = new Date(bb[2] + "-" + bb[1] + "-" + bb[0]);
			return dataa - datab;
		});
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

export default ListaEventos;