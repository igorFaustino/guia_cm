import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';

class Perfil extends Component {
    render(){
        return(
            <Container>
            <Row center="md">
                <Col md="4">
                    <img src={require('../img/perfil.jpg')} className="format1"/>
                </Col>
                <Col md="4">
                    <h3 className="small-space">Nome : </h3>
                    <p>Lorisvaldison Washington Oreo</p>
                </Col>
                <Col md="4">
                    <h3 className="small-space">Email : </h3>
                    <p>lorisvaldison6@gmail.com</p>
                    <Button className="btn btn-primary btn-sm right large-space">Adicionar Admin</Button>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default Perfil;
