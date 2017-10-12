import React, { Component } from 'react';
import { Col, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormService from './FormService';
import ServicoItem from './ListaItemServico';
const localStorageAuth = require('../util/localHostAuth.js');

class LoginMenu extends Component {
  render(){
    let servicoItens;
    if(this.state.servico){
      servicoItens = this.state.servico.map(servico => {
        return (
          <ServicoItem key={servico.nome} servico={servico}/>
        );
      });
    }
    
    return(
      <Container className="text-center content">
        <h1 className="large-space">Lista de Serviços</h1>
        <Col>
          {servicoItens}
        </Col>
        <Button className="circle-btn btn-lg" onClick={this.toggle} >+</Button>

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

export default LoginMenu;