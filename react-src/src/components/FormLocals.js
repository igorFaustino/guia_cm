import React, { Component } from 'react';
import { Col, Container, Button, InputGroup, Input, Row } from 'reactstrap';
import sha1 from 'sha1'
import superagent from 'superagent'

import ImageImport from './ImageImport';

const config = require("../config/cloudinaryConfig")
const classNames = require('classnames');

class FormLocals extends Component {
	constructor() {
		super();
		this.state = {
			nome: '',
			desc: '',
			local: '',
			horario: '',
			image: {},
			imageLink: '',
			edit: false
		}

		var nome;
		var desc;
		var local;
		var horario;
		var image;
		this.handleNomeChange = this.handleNomeChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
		this.handleLocalChange = this.handleLocalChange.bind(this);
		this.handleHorarioChange = this.handleHorarioChange.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		if (this.props.value) {
			this.setState({
				nome: this.props.value.nome,
				desc: this.props.value.desc,
				local: this.props.value.local,
				horario: this.props.value.horario,
				edit: true
			});
		};
	}

	handleNomeChange(e) {
		this.setState({ nome: e.target.value });
		if (e.target.value == '') {
			this.nome = false;
		} else {
			this.nome = true;
		}
	}

	handleImageChange(_image) {
		var image = _image;
		this.setState({ image });
	}

	handleDescChange(e) {
		this.setState({ desc: e.target.value });
		if (e.target.value == '') {
			this.desc = false;
		} else {
			this.desc = true;
		}
	}

	handleLocalChange(e) {
		this.setState({ local: e.target.value });
		if (e.target.value == '') {
			this.local = false;
		} else {
			this.local = true;
		}
	}

	handleHorarioChange(e) {
		this.setState({ horario: e.target.value });
		if (e.target.value == '') {
			this.horario = false;
		} else {
			this.horario = true;
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		const image = this.state.image;

		const cloudName = config.cloudName;
		const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'

		const timestamp = Date.now() / 1000;
		const uploadPreset = 'ymhhb6uf';

		const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' +
			uploadPreset + config.secret;

		const signature = sha1(paramsStr);
		const params = {
			api_key: config.apiKey,
			timestamp: timestamp,
			upload_preset: uploadPreset,
			signature: signature
		}

		let uploadRequest = superagent.post(url);
		uploadRequest.attach('file', image);

		Object.keys(params).forEach((key) => {
			uploadRequest.field(key, params[key])
		});

		let link;
		uploadRequest.end((err, res) => {
			if (err) {
				// callback(err, null)
				return
			}

			var local = {
				nome: this.state.nome,
				descricao: this.state.desc,
				endereco: this.state.local,
				horario: this.state.horario,
				image: res.body.url,
			}
			this.props.handleSubmit(local);
		})
	}

	render() {
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

		return (
			<form >
				<InputGroup className={"small-space"}>
					<Input placeholder="Nome do Local" value={this.state.nome} onChange={this.handleNomeChange} className={validationNome} type="text" />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Local do Evento" value={this.state.local} onChange={this.handleLocalChange} className={validationLocal} />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Horario de funcionamento" value={this.state.horario} onChange={this.handleHorarioChange} className={validationHorario} />
				</InputGroup>
				<InputGroup className="small-space">
					<textarea placeholder="Descricao do Local" rows="9" value={this.state.desc} onChange={this.handleDescChange} className={validationDesc}></textarea>
				</InputGroup>
				<ImageImport handleImage={this.handleImageChange} />
				<div className="text-center">
					<input className="btn btn-lg btn-success" type="submit" value="Submit" onClick={this.handleSubmit} disabled={(!this.nome || !this.desc || !this.local || !this.horario) && !this.state.edit} />
				</div>
			</form >
		);

	}

}

export default FormLocals;