import React, { Component } from 'react';
import { Col, Container, Button , InputGroup, Input} from 'reactstrap';
var classNames = require('classnames');

class FormService extends Component {
	constructor(){
		super();
		this.state = {
			nome: '',
			info: '',
			tel: ''
		}
		var nome;
		var info;
		var tel;

		this.handleNomeChange = this.handleNomeChange.bind(this)
		this.handleInfoChange = this.handleInfoChange.bind(this)
		this.handleTelChange = this.handleTelChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentWillMount(){

	}

	handleNomeChange(e){
		this.setState({nome: e.target.value});
		if(e.target.value == ''){
			this.nome = false;
		} else {
			this.nome = true;
		}
	}

	handleInfoChange(e){
		this.setState({info: e.target.value});
		if(e.target.value == ''){
			this.info = false;
		} else {
			this.info = true;
		}
	}

	handleTelChange(e){
		this.setState({tel: e.target.value});
		if(e.target.value == ''){
			this.tel = false;
		} else {
			this.tel = true;
		}
	}

	handleSubmit(e){

	}

	render(){
		var validationTitulo = classNames({
			'is-valid': this.titulo && this.titulo != undefined,
			'is-invalid': !this.titulo && this.titulo != undefined,
		});

		var validationData = classNames({
			'form-control': true,
			'is-valid': this.data && this.data != undefined,
			'is-invalid': !this.data && this.data != undefined,
		});

		var validationLocal = classNames({
			'is-valid': this.local && this.local != undefined,
			'is-invalid': !this.local && this.local != undefined,
		});

		var validationLink = classNames({
			'is-valid': this.link && this.link != undefined,
			'is-invalid': !this.link && this.link != undefined,
		});

		return(
			<form>
				<InputGroup className="small-space">
					<Input placeholder="Nome do serviço" value={this.state.nome} onChange={this.handleNomeChange} className={validationNome}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="info do serviço" value={this.state.info} onChange={this.handleInfoChange} className={validationInfo}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="telefone do serviço" value={this.state.tel} onChange={this.handleTelChange} className={validationTel}/>
				</InputGroup>
				<div className="text-center">
					<Button color="success" disabled={!this.nome || !this.info || !this.tel } >Adicionar</Button>
				</div>
			</form>
		);
			
	}
	
}

export default FormService;