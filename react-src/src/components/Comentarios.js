import React, { Component } from 'react';
import ComentariosItem from '../components/ComentariosItem';
import { Row, Container, InputGroup, Form } from 'reactstrap';

class Comentarios extends Component {
	constructor(props){
		super(props);
		this.state = {
			comentario: '',
		}
		var comentario;
		this.handleComentarioChange = this.handleComentarioChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleComentarioChange(e){
		this.setState({comentario: e.target.value});
		if(e.target.value === ''){
			this.comentario = false;
		} else {
			this.comentario = true;
		}
	}

	handleSubmit(e){
		// e.preventDefault();
		this.props.handleSubmit(this.state.comentario);
	}

	render() {
		let comentarios = this.props.comentarios;
		if(comentarios){
			comentarios = comentarios.map(comentario => {
				return(
					<ComentariosItem key={comentario._id} comentario={comentario} delete={this.handleDelete}/>
				);
			});
		}
		
		return (
			<Container className="small-space">
				<h5>Comentarios</h5>
				{comentarios}
				<Form action="">
					<InputGroup className="small-space">
						<textarea placeholder="Novo comentario..." rows="8" className="form-control" value={this.state.comentario} onChange={this.handleComentarioChange}></textarea>
					</InputGroup>
					<button className="btn btn-large btn-block btn-primary" type="submit" onClick={this.handleSubmit}>Comentar</button>
				</Form>
				
			</Container>
		);
	}
}

export default Comentarios;
