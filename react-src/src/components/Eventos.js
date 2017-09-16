import React, { Component } from 'react';
import { Col, Container} from 'reactstrap';
import  EventosItem from './EventosItem';

class Eventos extends Component {
	constructor(){
		super();
		this.state = {
			eventos: []
		}
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
				<Container className="text-center">
				<h1 className="large-space">Lista de Eventos</h1>
				<Col>
					{eventoItens}
				</Col>
			</Container>
			);
				
		}
	
}

export default Eventos;