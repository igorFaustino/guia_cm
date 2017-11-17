import React, { Component } from 'react';
import { Row, Col, Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import noImage from '../img/noImage.jpg';
import coffe from '../img/cafeteria.jpg';
import noImage from '../img/noImage.jpg';
import Mapa from '../components/Mapa.js'
import Comentarios from '../components/Comentarios'

import FormLocals from '../components/FormLocals.js';

const localStorageAuth = require('../util/localHostAuth.js');


class Local extends Component {
	constructor(){
		super();
		this.state = {
			modal: false,
			local: {},
			cometario: {},
			comentarios: []
		}
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
		this.saveOnDatabase = this.saveOnDatabase.bind(this);
		this.saveCommentsOnDatabase = this.saveCommentsOnDatabase.bind(this);
		this.getLocalsFromDatabase = this.getLocalsFromDatabase.bind(this);
		this.getCommentsFromDatabase = this.getCommentsFromDatabase.bind(this);
	}

	componentWillMount(){
		this.getLocalsFromDatabase();
		this.getCommentsFromDatabase();
	}

	getLocalsFromDatabase(){
		fetch('http://localhost:5000/api/local/' + this.props.match.params.id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json()).then((json) => {
			this.setState({
				local: json
			});
		});
	}

	getCommentsFromDatabase = () => {
		fetch('http://localhost:5000/api/comment/' + this.props.match.params.id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then((response) => response.json()).then((json) => {
			this.setState({
				comentarios: json,
			});
		});
	}


	saveOnDatabase(){
		let local = {
			nome: this.state.local.nome,
			descricao: this.state.local.desc,
			endereco: this.state.local.endereco,
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

	saveCommentsOnDatabase(comentario){
		let user = localStorage.getItem('user');
		user = JSON.parse(user);
		let comment = {
			user: user.displayName,
			local: this.props.match.params.id,
			userImage: user.photoURL,
			comentario: comentario,
		}
		fetch('http://localhost:5000/api/comment/' + this.props.match.params.id, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(comment)
		}).then((response) => {
			if(response.success){
				alert("show");
				this.setState({
					comentarios: this.state.comentarios.concat(response.comment)
				})
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

	handleSubmit(cometario){
		this.saveCommentsOnDatabase(cometario);
	}

	handleCommentSubmit(cometario){
		this.saveCommentsOnDatabase(cometario);
		// this.toggle();
		// this.saveOnDatabase();
	}

	deleteFromDatabase(deletedComment){
		fetch('http://localhost:5000/api/local/' + deletedComment._id, {
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
				let comentarios = this.state.comentarios;
				comentarios = comentarios.filter((comentario)=>{
					if(comentario._id !== deletedComment._id){
						return true;
					}
					return false;
				});
				this.setState({
					comentarios: comentarios,
				});
			} else {
				alert("droga");
			}
		});
	}

	render() {
		let editButton;
		if(localStorageAuth.thereIsAdim()){
			editButton = <Button className="btn-lg large-space" color="primary" onClick={this.toggle}>Editar Local</Button>;
		}
		if(this.state.local.cordenadas == null){
			return null;
		}
		return (
			<Container className="text-center">
				<h1 className="large-space" >{this.state.local.nome}</h1>
				<Row>
					<Col md="6">
						<img src={this.state.local.image || noImage} alt="Foto do local" className="figure-img img-fluid rounded"></img>
					</Col>
					<Col md="6">
						<Container className="margin">
							<p>{this.state.local.desc}</p>
							<p>{this.state.local.endereco}</p>
							<p>{this.state.local.horario}</p>
							<Button color="primary" size="lg" block disabled>Acessar site</Button>
						</Container>
					</Col>
				</Row>
				<div className="map-space">
					<hr className="large-space" />
					<h3 className="large-space">Como chegar</h3>
					<Container className="align-center large-space map">
						<Mapa coordenadas={this.state.local.cordenadas}/>
					</Container>
				</div>
				<hr/>
				{editButton}
				<Container>
					<Comentarios comentarios={this.state.comentarios} handleSubmit={this.handleCommentSubmit} />
				</Container>
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
