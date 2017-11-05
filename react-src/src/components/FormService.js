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
		if(e.target.value === ''){
			this.nome = false;
		} else {
			this.nome = true;
		}
	}

	handleInfoChange(e){
		this.setState({info: e.target.value});
		if(e.target.value === ''){
			this.info = false;
		} else {
			this.info = true;
		}
	}

	handleTelChange(e){
		this.setState({tel: e.target.value});
		if(e.target.value === ''){
			this.tel = false;
		} else {
			this.tel = true;
		}
	}

	handleSubmit(e){
		e.preventDefault();
		var servico = {
			nome: this.state.nome,
			info: this.state.info,
			telefone: this.state.tel	
		}
		this.props.handleSubmit(servico);

	}

	render(){
		var validationNome = classNames({
			'is-valid': this.nome && this.nome !== undefined,
			'is-invalid': !this.nome && this.nome !== undefined,
		});

		var validationInfo = classNames({
			'form-control': true,
			'is-valid': this.info && this.info !== undefined,
			'is-invalid': !this.info && this.info !== undefined,
		});

		var validationTel = classNames({
			'is-valid': this.tel && this.tel !== undefined,
			'is-invalid': !this.tel && this.tel !== undefined,
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
					<Button color="success" disabled={!this.nome || !this.info || !this.tel } onClick={this.handleSubmit} >Adicionar</Button>
				</div>
			</form>
		);
			
	}
	
}

export default FormService;