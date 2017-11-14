import React, { Component } from 'react';
import { Row, Col, Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Redirect } from 'react-router'
import  FormEvents from '../components/FormAdmin';

const localStorageAuth = require('../util/localHostAuth.js');

class Perfil extends Component {
    constructor(){
		super();
		this.state = {
            user: {},
            modal: false,
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
		this.setState({
			user: JSON.parse(localStorage.getItem('user')),
        });
    }

    toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

    saveOnDatabase(admin){
		fetch('http://localhost:5000/users/admin', {
			method: 'POST',
			// mode: 'no-cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': localStorage.getItem('admin'),
			},
			body: JSON.stringify({
				'email': admin.email,
			})
		}).then((response) => response.json()).then((json) => {
			if(json.success){
				alert("show");
			} else {
				alert("droga");
			}
		});
    }
    
    handleSubmit(admin){
		this.saveOnDatabase(admin);
		this.toggle();
	}
    
    render(){
        if(!localStorageAuth.thereIsUser()){
            return (
                <Redirect to="/"/>
            )
        }

        let addButton;
		if(localStorageAuth.thereIsAdim()){
			addButton = <Button className="btn btn-primary btn-sm right large-space" onClick={this.toggle}>Adicionar Admin</Button>;
		}

        return(
            <Container>
            <Row>
                <Col md="4">
                    <img src={this.state.user.photoURL} className="format1"/>
                </Col>
                <Col md="4">
                    <h3 className="small-space">Nome : </h3>
                    <p>{this.state.user.displayName}</p>
                </Col>
                <Col md="4">
                    <h3 className="small-space">Email : </h3>
                    <p>{this.state.user.email}</p>
                    {addButton}
                </Col>
            </Row>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
					<ModalHeader toggle={this.toggle}>Adicionar Evento</ModalHeader>
					<ModalBody>
						<FormEvents handleSubmit={this.handleSubmit} />
					</ModalBody>
				</Modal>
            </Container>
        );
    }
}

export default Perfil;
