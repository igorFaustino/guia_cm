import React, { Component } from 'react';
import ComentariosItem from '../components/ComentariosItem';
import { Row, Container, InputGroup, Form } from 'reactstrap';

class Comentarios extends Component {
	constructor(){
		super();
		this.state = {
			comentarios: [
				{
					_id: "mnbvmzcbmvx",
					userImage: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
					user: 'Igor Faustino',
					comentario: "Muito Legal"
				},
				{
					_id: "xvzxczv",
					userImage: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
					user: 'Igor Faustino',
					comentario: "Muito Legal"
				},
			]
		}
	}

	componentWillMount(){
		this.setState({
			categories: [],
		});
	}
	
	render() {
		let comentarios;
		if(this.state.comentarios){
			comentarios = this.state.comentarios.map(comentario => {
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
						<textarea placeholder="Novo comentario..." rows="8" className="form-control"></textarea>
					</InputGroup>
					<button className="btn btn-large btn-block btn-primary">Comentar</button>
				</Form>
				
			</Container>
		);
	}
}

export default Comentarios;
