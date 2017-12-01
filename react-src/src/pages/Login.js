import React, { Component } from 'react';
import { Button , InputGroup, Input} from 'reactstrap';
import { Redirect } from 'react-router'


const firebase = require('firebase');
const localStorageAuth = require('../util/localHostAuth.js');

var config = require('../config/firebaseConfig');
// Exemplo arquivo firebaseConfig:
// module.exports = {
// 	apiKey: "hkshDKAHSDLYSDL",
// 	authDomain: "blablabla",
// 	databaseURL: "https://blablabla",
// 	projectId: "blablabla",
// 	storageBucket: "blablabla.appspot.com",
// 	messagingSenderId: "13284123846123"
// }


firebase.initializeApp(config);

class Login extends Component {
	constructor(){
		super();
		this.state = {
		}
		this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
	}

	componentWillMount(){ }

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