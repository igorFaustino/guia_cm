import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './components/Content.js';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Jumbotron } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import Inicio from './components/Inicio.js';
import Categories from './components/Categories.js';
import Category from './components/Category.js';
import Eventos from './components/Eventos.js';
import Local from './components/Local.js';
import Servicos from './components/Servicos.js';
import Lista from './components/Lista.js';

	var items = [
		<Link to="/categorias">Categorias</Link>,
		<Link to="/eventos">Eventos</Link>,
		<Link to="/servicos">Eventos</Link>,
		<Link to="/classificados">Classificados</Link>
	];


const cont_true = false;

class App extends Component {
	
	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		return (
			<Router>
				<div>
					<header>
						<nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">

								<Link to="/" className="navbar-brand"><span className="my-nav-brand">GUIA CM</span></Link>
								<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>

								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									<ul className="mr-auto mt-2 mt-lg-0"></ul>
									<ul className="navbar-nav my-2 my-lg-0">
										<li className="nav-item">
											<Link to="/localidades" className="nav-link"><span className="my-nav-item">Localidades</span> <span className="sr-only">(current)</span></Link>
										</li>
										<li className="nav-item my-nav-item">
											<Link to="/eventos" className="nav-link"><span className="my-nav-item">Eventos</span><span className="sr-only">(current)</span></Link>
										</li>
										<li className="nav-item my-nav-item">
											<Link to="/servicos" className="nav-link"><span className="my-nav-item">Serviços</span><span className="sr-only">(current)</span></Link>
										</li>
									</ul>
								</div>
								
						</nav>
						<Jumbotron className="bg-header" fluid>
						</Jumbotron>
					</header>
					<Container>
						<Route exact path="/" component={Inicio}/>
						<Route exact path="/localidades" component={Categories}/>
						<Route exact path="/localidades/:categoria" component={Category}/>
						<Route exact path="/servicos" component={Servicos}/>
						<Route exact path="/servicos/:servico" component={Lista}/>
						<Route path="/eventos" component={Eventos}/>
						
						<Route path="/local/:nome" component={Local}/>
					</Container>
				</div>
			</Router>
		);
	}
}

export default App;
