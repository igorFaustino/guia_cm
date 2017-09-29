import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  EventosItem from './EventosItem';
import  FormEvents from './FormEvents';

class Eventos extends Component {
	constructor(){
		super();
		this.state = {
			eventos: [],
			modal: false
		}
		this.toggle = this.toggle.bind(this);
	}

	componentWillMount(){
		this.setState(
			{eventos:[
				{
					title: 'Abracos gratis',
					local: 'Praça da Igreja Matriz',
					data:  '15/04/2017',  
					image: '../../public/fonts/hugs.jpeg'
				},
				{
					title: 'Palestra Suicidio do SO',
					local: 'Anfiteatro UTFPR',
					data:  '15/04/2017',  
					image: '../../public/fonts/win.jpg'
				},
				{
					title: 'Feira do Escambo',
					local: 'Em frente a Rodoviária',
					data:  '08/10/2017',  
					image: '../../public/fonts/feira.jpg'
				},
				{
					title: 'Exposicao de Aranhas',
					local: 'No hipermercado Big',
					data:  '13/12/2017',  
					image: '../../public/fonts/aragogh.jpeg'
				}

			]
		});
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render(){
		let eventoItens;
		if(this.state.eventos){
			eventoItens = this.state.eventos.map(evento => {
				return (
					<EventosItem key={evento.title} evento={evento}/>
				);
			});
		}
		
		return(
			<Container className="text-center content">
				<h1 className="large-space">Lista de Eventos</h1>
				<Col>
					{eventoItens}
				</Col>
				<Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>

				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader toggle={this.toggle}>Adicionar Evento</ModalHeader>
					<ModalBody>
						<FormEvents />
					</ModalBody>
				</Modal>
			</Container>
		);
			
	}
	
}

export default Eventos;