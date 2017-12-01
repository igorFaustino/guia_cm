import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import EventosItem from '../components/EventosItem';
import FormEvents from '../components/FormEvents';
import { DateRange } from 'react-date-range';

const localStorageAuth = require('../util/localHostAuth.js');
const moment = require('moment')

class ListaEventos extends Component {
	constructor() {
		super();
		this.state = {
			filterEventos: [],
			eventos: [],
			modal: false,
			value: "",
			startDate: null,
			endDate: null,
			filter: false,
		}
		this.toggle = this.toggle.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.filterEvents = this.filterEvents.bind(this);
	}

	componentWillMount() {
		this.getEventsFromDatabase();
	}

	getEventsFromDatabase() {
		fetch('https://guia-cm.herokuapp.comapi/events', {
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

	saveOnDatabase(evento) {
		fetch('https://guia-cm.herokuapp.comapi/event', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('admin'),
			},
			body: JSON.stringify({
				'titulo': evento.titulo,
				'local': evento.local,
				'data': evento.data,
				'link': evento.link,
				'image': evento.image
			})
		}).then((response) => response.json()).then((json) => {
			if (json.success) {
				alert("daora");
				this.setState({
					eventos: this.state.eventos.concat(json.event),
					startDate: null,
					endDate: null,
					filter: false,
					filterEventos: []
				});
			}
			else {
				alert("Falha ao realizar operação");
			}
		});
	}

	deleteFromDatabase(deletedEvento) {
		fetch('https://guia-cm.herokuapp.comapi/event/' + deletedEvento._id, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': localStorage.getItem('admin'),
			}
		}).then((response) => response.json()).then((json) => {
			if (json.success) {
				alert("Sucesso ao realizar operação");
				let eventos = this.state.eventos;
				eventos = eventos.filter((evento) => {
					if (evento._id !== deletedEvento._id) {
						return true;
					}
					return false;
				});
				this.setState({
					eventos: eventos,
					startDate: null,
					endDate: null,
					filter: false,
					filterEventos: []
				});
			}
			else {
				alert("Falha ao realizar operação");
			}
		});
	}

	handleValueChange(e) {
		this.setState({ value: e.target.value });
	}

	handleSubmit(evento) {
		this.saveOnDatabase(evento);
		this.toggle();
	}

	handleDelete(deletedEvento) {
		this.deleteFromDatabase(deletedEvento);

	}


	filterEvents() {
		let filterEventos = this.state.eventos
		filterEventos = filterEventos.filter((evento) => {
			let data = moment(evento.data, 'DD/MM/YYYY');
			return data.toDate() >= this.state.startDate.toDate() && data.toDate() <= this.state.endDate.toDate()
		})
		this.setState({
			filterEventos: filterEventos,
			filter: true
		})
	}

	handleSelect(date) {
		if (this.state.eventos) {
			this.setState({
				endDate: date.endDate,
				startDate: date.startDate
			})
			this.filterEvents()
		}
	}

	handleSelectInit = (date) => {
		this.setState({
			endDate: date.endDate,
			startDate: date.startDate,
			filter: false
		})
	}


toggle() {
	this.setState({
		modal: !this.state.modal
	});
}

render() {
	let addButton;
	if (localStorageAuth.thereIsAdim()) {
		addButton = <Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>;
	}

	let filter
	if (this.state.filter && this.state.filterEventos.length == 0) {
		filter = <p>Nenhum resultado encontrado</p>
	}

	let eventos;
	if (this.state.filterEventos.length > 0) {
		eventos = this.state.filterEventos.sort(function (a, b) {
			let aa = a.data.split("/");
			let dataa = new Date(aa[2] + "-" + aa[1] + "-" + aa[0]);
			let bb = b.data.split("/");
			let datab = new Date(bb[2] + "-" + bb[1] + "-" + bb[0]);
			return dataa - datab;
		});
	} else {
		eventos = this.state.eventos.sort(function (a, b) {
			let aa = a.data.split("/");
			let dataa = new Date(aa[2] + "-" + aa[1] + "-" + aa[0]);
			let bb = b.data.split("/");
			let datab = new Date(bb[2] + "-" + bb[1] + "-" + bb[0]);
			return dataa - datab;
		});
	}

	eventos = eventos.map(evento => {
		return (
			<EventosItem key={evento._id} evento={evento} delete={this.handleDelete} />
		);
	});

	return (
		<Container className="text-center content">
			<h1 className="large-space">Lista de Eventos</h1>
			<DateRange
				onInit={this.handleSelectInit}
				onChange={this.handleSelect}
			/>
			<button className="btn btn-secondary" onClick={() => {
				this.setState({
					filterEventos: [],
					filter: null
				})
			}}>Limpar filtros</button>
			<div className="large-space">{filter}</div>
			<Col className="large-space">
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