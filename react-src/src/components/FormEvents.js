import React, { Component } from 'react';
import { Button , InputGroup, Input} from 'reactstrap';
var classNames = require('classnames');

class FormEvents extends Component {
	constructor(){
		super();
		this.state = {
			titulo: '',
			data: '',
			local: '',
			link: ''
		}
		var titulo;
		var data;
		var local;
		var link;

		this.handleTituloChange = this.handleTituloChange.bind(this)
		this.handleDataChange = this.handleDataChange.bind(this)
		this.handleLocalChange = this.handleLocalChange.bind(this)
		this.handleLinkChange = this.handleLinkChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentWillMount(){

	}

	handleTituloChange(e){
		this.setState({titulo: e.target.value});
		if(e.target.value === ''){
			this.titulo = false;
		} else {
			this.titulo = true;
		}
	}

	handleDataChange(e){
		this.setState({data: e.target.value});
		if(e.target.value === ''){
			this.data = false;
		} else {
			this.data = true;
		}
	}

	handleLocalChange(e){
		this.setState({local: e.target.value});
		if(e.target.value === ''){
			this.local = false;
		} else {
			this.local = true;
		}
	}

	handleLinkChange(e){
		this.setState({link: e.target.value});
		if(e.target.value === ''){
			this.link = false;
		} else {
			this.link = true;
		}
	}

	handleSubmit(e){

	}

	render(){
		var validationTitulo = classNames({
			'is-valid': this.titulo && this.titulo !== undefined,
			'is-invalid': !this.titulo && this.titulo !== undefined,
		});

		var validationData = classNames({
			'form-control': true,
			'is-valid': this.data && this.data !== undefined,
			'is-invalid': !this.data && this.data !== undefined,
		});

		var validationLocal = classNames({
			'is-valid': this.local && this.local !== undefined,
			'is-invalid': !this.local && this.local !== undefined,
		});

		var validationLink = classNames({
			'is-valid': this.link && this.link !== undefined,
			'is-invalid': !this.link && this.link !== undefined,
		});

		return(
			<form>
				<InputGroup className="small-space">
					<Input placeholder="Titulo do Evento" value={this.state.titulo} onChange={this.handleTituloChange} className={validationTitulo}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Data do evento" value={this.state.data} onChange={this.handleDataChange} className={validationData}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Local do Evento" value={this.state.local} onChange={this.handleLocalChange} className={validationLocal}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Link do Evento" value={this.state.link} onChange={this.handleLinkChange} className={validationLink}/>
				</InputGroup>
				<div className="text-center">
					<Button color="success" disabled={!this.titulo || !this.data || !this.local || !this.hora || !this.link} >Adicionar</Button>
				</div>
			</form>
		);
			
	}
	
}

export default FormEvents;