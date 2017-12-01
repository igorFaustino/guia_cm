import React, { Component } from 'react';
import ComentariosItem from '../components/ComentariosItem';
import { Row, Container, InputGroup, Form } from 'reactstrap';

const util = require('../util/localHostAuth')

class Comentarios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comentario: '',
		}
		var comentario;
		this.handleComentarioChange = this.handleComentarioChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleComentarioChange(e) {
		this.setState({ comentario: e.target.value });
		if (e.target.value === '') {
			this.comentario = false;
		} else {
			this.comentario = true;
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		let comentario = this.state.comentario;
		this.setState({
			comentario: ''
		})
		this.props.handleSubmit(comentario);
	}

	handleDelete(comentario) {
		this.props.delete(comentario)
	}

	render() {
		let comentarios = this.props.comentarios;
		if (comentarios) {
			comentarios = comentarios.map(comentario => {
				return (
					<ComentariosItem key={comentario._id} comentario={comentario} delete={this.handleDelete} />
				);
			});
		}

		let formComentario = "";

		if (util.thereIsUser()) {
			formComentario =
				(<Form action="">
					<InputGroup className="small-space">
						<textarea placeholder="Novo comentario..." rows="8" className="form-control" value={this.state.comentario} onChange={this.handleComentarioChange}></textarea>
					</InputGroup>
					<button className="btn btn-large btn-block btn-primary" type="submit" onClick={this.handleSubmit}>Comentar</button>
				</Form>)
		}

		return (
			<Container className="small-space">
				<h5>Comentarios</h5>
				{comentarios}
				{formComentario}
			</Container>
		);
	}
}

export default Comentarios;
