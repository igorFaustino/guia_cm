import React, { Component } from 'react';
import './App.css';
import { Container,  Jumbotron } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link,
} from 'react-router-dom'

import Inicio from './pages/Inicio.js';
import Categorias from './pages/Categorias.js';
import ListaLocais from './pages/ListaLocais.js';
import ListaEventos from './pages/ListaEventos.js';
import Local from './pages/Local.js';
import ListaServicos from './pages/ListaServicos.js';
import Login from './pages/Login.js';
import Perfil from './pages/Perfil.js';

const localStorageAuth = require('./util/localHostAuth.js');
const firebase = require('firebase');

var config = require('./config/firebaseConfig');
// Exemplo arquivo firebaseConfig:
// module.exports = {
// 	apiKey: "hkshDKAHSDLYSDL",
// 	authDomain: "blablabla",
// 	databaseURL: "https://blablabla",
// 	projectId: "blablabla",
// 	storageBucket: "blablabla.appspot.com",
// 	messagingSenderId: "13284123846123"
// }


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

	handleGoogleLogin(){
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('token', token);

			firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
				fetch('http://localhost:5000/users/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'idToken' : idToken
					})
				}).then((response) => response.json()).then((json) => {
					console.log(json);
					if(json.success){
						localStorage.setItem('admin', json.token);
					}
					window.location.reload()
				});
			});

		}).catch(function(error) {
			alert("Ocoreu uma falha");
		});
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
								<a className="nav-link" onClick={this.handleGoogleLogin}>Login</a>
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
							<Categorias {...props} categories={this.state.categoriesLocalidades} nome="localidades" link="/localidades/"/>
						)} />
						<Route exact path="/localidades/:categoria" component={ListaLocais}/>
						<Route exact path="/servicos" render={(props) => (
							<Categorias {...props} categories={this.state.categoriesServicos} nome="serviços" link="/servicos/"/>
						)} />
						<Route exact path="/servicos/:servico" component={ListaServicos}/>
						<Route path="/eventos" component={ListaEventos}/>
						<Route path="/login" component={Login}/>
						<Route path="/local/:nome" component={Local}/>
						<Route path="/profile" component={Perfil}/>
						
					</Container>
				</div>
			</Router>
		);
	}
}

export default App;
