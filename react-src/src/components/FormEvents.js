import React, { Component } from 'react';
import { Button , InputGroup, Input} from 'reactstrap';

import sha1 from 'sha1'
import superagent from 'superagent'

import ImageImport from './ImageImport';

const config = require("../config/cloudinaryConfig")
var classNames = require('classnames');

class FormEvents extends Component {
	constructor(){
		super();
		this.state = {
			titulo: '',
			data: '',
			local: '',
			link: '',
			image: {},
			imageLink: '',
		}
		var titulo;
		var data;
		var local;
		var link;

		this.handleTituloChange = this.handleTituloChange.bind(this)
		this.handleDataChange = this.handleDataChange.bind(this)
		this.handleLocalChange = this.handleLocalChange.bind(this)
		this.handleLinkChange = this.handleLinkChange.bind(this)
		this.handleImageChange = this.handleImageChange.bind(this)
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

	handleImageChange(_image) {
		var image = _image;
		this.setState({ image });
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

		uploadRequest.end((err, res) => {
			if (err) {
				// callback(err, null)
				return
			}
			this.setState({
				imageLink: res.body.url
			});
			var evento = {
				titulo: this.state.titulo,
				data: this.state.data,
				local: this.state.local,
				link: this.state.link,
				image: res.body.url,
			}
			this.props.handleSubmit(evento);
		})

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
					<Input placeholder="Titulo do Evento" value={this.state.titulo} onChange={this.handleTituloChange}
					className={validationTitulo}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Data do evento" value={this.state.data} onChange={this.handleDataChange} 
					className={validationData}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Local do Evento" value={this.state.local} onChange={this.handleLocalChange} 
					className={validationLocal}/>
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Link do Evento" value={this.state.link} onChange={this.handleLinkChange} 
					className={validationLink}/>
				</InputGroup>
				<ImageImport handleImage={this.handleImageChange} />
				<div className="text-center">
					<input className="btn btn-lg btn-success" type="submit" value="Submit" onClick={this.handleSubmit} 
					disabled={!this.titulo || !this.data || !this.local || !this.link} />
				</div>
			</form>
		);
			
	}
	
}

export default FormEvents;