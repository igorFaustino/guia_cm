import React, { Component } from 'react';
import { Button , InputGroup, Input} from 'reactstrap';
import { Route, Redirect } from 'react-router'
var classNames = require('classnames');
const firebase = require('firebase');
const localStorageAuth = require('../util/localHostAuth.js');

var config = {
	apiKey: "AIzaSyC5NsEaFZSMNvdWmMOha9jx-Evaf2OhEgY",
	authDomain: "guia-cm.firebaseapp.com",
	databaseURL: "https://guia-cm.firebaseio.com",
	projectId: "guia-cm",
	storageBucket: "guia-cm.appspot.com",
	messagingSenderId: "946823780391"
};
firebase.initializeApp(config);

class Login extends Component {
	constructor(){
		super();
		this.state = {
		}
		this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
	}

	componentWillMount(){
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
			// ...
			// Redirecionar aqui!!!
			window.location.reload()
			this.props.router.push('/');
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
	}

	render(){
		if(localStorageAuth.thereIsUser()){
			return (
				<Redirect to="/"/>
			)
		}
		return(
			<form>
				<InputGroup className="small-space">
					<Input placeholder="Email" />
				</InputGroup>
				<InputGroup className="small-space">
					<Input placeholder="Password" />
				</InputGroup>
				<div className="text-center small-space">
					<Button color="success" block>Login</Button>
				</div>
				<hr/>
				<div className="text-center small-space">
					<Button color="danger" onClick={this.handleGoogleLogin} block>Login Google</Button>
				</div>
			</form>
		);
			
	}
	
}

export default Login;