import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import { Redirect } from 'react-router'

const localStorageAuth = require('../util/localHostAuth.js');

class Perfil extends Component {
    constructor(){
		super();
		this.state = {
			user: {}
		}
	}

	componentWillMount(){
		this.setState({
			user: JSON.parse(localStorage.getItem('user')),
        });
    }
    
    render(){
        if(!localStorageAuth.thereIsUser()){
			return (
				<Redirect to="/"/>
			)
		}
        return(
            <Container>
            <Row center="md">
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
                    <Button className="btn btn-primary btn-sm right large-space">Adicionar Admin</Button>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default Perfil;
