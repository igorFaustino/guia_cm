import React, { Component } from 'react';
import './App.css';
import { Container,  Jumbotron } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom'

import Inicio from './components/Inicio.js';
import Categories from './components/Categories.js';
import LocalsFromCategory from './components/LocalsFromCategory.js';
import Eventos from './components/Eventos.js';
import Local from './components/Local.js';
import Lista from './components/Lista.js';
import Login from './components/Login.js';

const localStorageAuth = require('./util/localHostAuth.js');

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			categoriesLocalidades: [],
			categoriesServicos: [],
		}
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true
		};
	}

	componentWillMount(){
		this.setState({
			categoriesLocalidades: [{
				nome: 'Lazer',
				img: require ('./img/lazer.jpg')
			},
			{
				nome: 'Alimentação',
				img: require ('./img/alimentacao.jpg')
			},
			{
				nome: 'Compras',
				img: require ('./img/compras.jpg')
			}],
			categoriesServicos: [
				{
					nome: 'Taxi',
					img: require('./img/taxi.jpg')
					
				},
				{
					nome: 'Diarísta',
					img: require('./img/diarista.jpg')
					
				},
				{
					nome: 'Mudança de Móveis',
					img: require('./img/mudanca.jpg')
					
				},
				{
					nome: 'Delivery',
					img: require('./img/delivery.jpeg')
					
				},
				{
					nome: 'Encanador',
					img: require('./img/encanador.jpg')
					
				},
				{
					nome: 'Detetização',
					img: require('./img/detetizacao.jpg')
					
				}
			]
		})
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	logOut(){
		localStorage.clear();
		window.location.reload()
	}

	rightMenu(){
		var rightMenu;
		const user = JSON.parse(localStorageAuth.thereIsUser());
		if(user){
			console.log(user);
			rightMenu = (	
							<ul className="navbar-nav  mt-2 mt-lg-0">
								{/* <span><img src={user.photoURL} alt="" className="img user-img rounded-circle"/></span> */}
								<li className="nav-item">
									<Link to="/profile" className="nav-link">
										<span className="my-nav-item"> {user.displayName}</span><span className="sr-only">(current)</span>
									</Link>
								</li>
								<li className="nav-item">
									<a className="nav-link" onClick={this.logOut}>Log Out</a>
								</li>
							</ul>
						);
		} else {
			rightMenu = (
							<ul className="navbar-nav  mt-2 mt-lg-0">	
								<li className="nav-item">
									<Link to="/login" className="nav-link"><span className="my-nav-item">Login</span><span className="sr-only" >(current)</span></Link>
								</li>
							</ul>
						);
		}
		return rightMenu;
	}

	render() {
		let loginMenu = this.rightMenu();
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
								<ul className="mr-auto navbar-nav my-2 my-lg-0">
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
								{loginMenu}
							</div>	
						</nav>
						<Jumbotron className="bg-header top-space" fluid>
						</Jumbotron>
					</header>
					<Container>
						<Route exact path="/" component={Inicio}/>
						<Route exact path="/localidades" render={(props) => (
							<Categories {...props} categories={this.state.categoriesLocalidades} nome="localidades" link="/localidades/"/>
						)} />
						<Route exact path="/localidades/:categoria" component={LocalsFromCategory}/>
						<Route exact path="/servicos" render={(props) => (
							<Categories {...props} categories={this.state.categoriesServicos} nome="serviços" link="/servicos/"/>
						)} />
						<Route exact path="/servicos/:servico" component={Lista}/>
						<Route path="/eventos" component={Eventos}/>
						<Route path="/login" component={Login}/>
						<Route path="/local/:nome" component={Local}/>
					</Container>
				</div>
			</Router>
		);
	}
}

export default App;
