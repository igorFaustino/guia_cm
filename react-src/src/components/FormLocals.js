import React, { Component } from 'react';
import { Col, Container, Button , InputGroup, Input} from 'reactstrap';
var classNames = require('classnames');

class FormLocals extends Component {
	constructor(){
		super();
		this.state = {
			nome: '',
			desc: '',
			local: '',
			horario: '',
			edit: false
		}

		var nome;
		var desc;
		var local;
		var horario;
		this.handleNomeChange = this.handleNomeChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleLocalChange = this.handleLocalChange.bind(this);
		this.handleHorarioChange = this.handleHorarioChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
		if(this.props.value){
			this.setState({
				nome: this.props.value.nome,
				desc: this.props.value.desc,
				local: this.props.value.local,
				horario: this.props.value.horario,
				edit: true
			});
		};
	}

	handleNomeChange(e){
		this.setState({nome: e.target.value});
		if(e.target.value == ''){
			this.nome = false;
		} else {
			this.nome = true;
		}
	}

	handleDescChange(e){
		this.setState({desc: e.target.value});
		if(e.target.value == ''){
			this.desc = false;
		} else {
			this.desc = true;
		}
	}

	handleLocalChange(e){
		this.setState({local: e.target.value});
		if(e.target.value == ''){
			this.local = false;
		} else {
			this.local = true;
		}
	}

	handleHorarioChange(e){
		this.setState({horario: e.target.value});
		if(e.target.value == ''){
			this.horario = false;
		} else {
			this.horario = true;
		}
	}

	handleSubmit(e){
		e.preventDefault();
		var local = {
			nome: this.state.nome,
			descricao: this.state.desc,
			endereco: this.state.local,
			horario: this.state.horario
		}
		this.props.handleSubmit(local);
	}

	render(){
		var validationNome = classNames({
			'is-valid': this.nome && this.nome != undefined,
			'is-invalid': !this.nome && this.nome != undefined,
		});

		var validationDesc = classNames({
			'form-control': true,
			'is-valid': this.desc && this.desc != undefined,
			'is-invalid': !this.desc && this.desc != undefined,
		});

		var validationLocal = classNames({
			'is-valid': this.local && this.local != undefined,
			'is-invalid': !this.local && this.local != undefined,
		});

		var validationHorario = classNames({
			'is-valid': this.horario && this.horario != undefined,
			'is-invalid': !this.horario && this.horario != undefined,
		});

		return(
			<form >
				<InputGroup className={"small-space"}>
					<Input placeholder="Nome do Local" value={this.state.nome} onChange={this.handleNomeChange} className={validationNome} type="text"/>
				</InputGroup>
				<InputGroup className="small-space">
					<textarea placeholder="Descricao do Local" rows="8" value={this.state.desc} onChange={this.handleDescChange} className={validationDesc}></textarea>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Local do Evento" value={this.state.local} onChange={this.handleLocalChange} className={validationLocal} />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Horario de funcionamento" value={this.state.horario} onChange={this.handleHorarioChange} className={validationHorario} />
				</InputGroup>
				<div className="text-center">
					<input className="btn btn-lg btn-success" type="submit" value="Submit" onClick={this.handleSubmit} disabled={(!this.nome || !this.desc || !this.local || !this.horario) && !this.state.edit}/>
				</div>
			</form>
		);
			
	}
	
}

export default FormLocals;