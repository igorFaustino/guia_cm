import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormService from './FormService';
import ServicoItem from './ListaItemServico';

const localStorageAuth = require('../util/localHostAuth.js');

class Servico extends Component {
  constructor(){
    super();
    this.state = {
      servico: [],
      modal:false
    }
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount(){
    this.setState(
      {servico:[
        {
          nome: 'WhatEver',
          telefone: '444-5555',
          descricao: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        {
          nome: 'Nobody is Door',
          telefone: '665-4852',
          descricao: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas'  
        },
        {
          nome: 'Ramdom',
          telefone: '154-8452',
          descricao: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
        {
          nome: 'Foda-se',
          telefone: '541-5925',
          descricao: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem'
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
    let servicoItens;
    if(this.state.servico){
      servicoItens = this.state.servico.map(servico => {
        return (
          <ServicoItem key={servico.nome} servico={servico}/>
        );
      });
    }

		let addButton;
		if(localStorageAuth.thereIsAdim()){
			addButton = <Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>;
		}
    
    return(
      <Container className="text-center content">
        <h1 className="large-space">Lista de Serviços</h1>
        <Col>
          {servicoItens}
        </Col>
        {addButton}

        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>Adicionar Servico</ModalHeader>
          <ModalBody>
            <FormService/>
          </ModalBody>
        </Modal>
      </Container>
    );
      
  }
  
}

export default Servico;