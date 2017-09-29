import React, { Component } from 'react';
import CategoryItem from './CategoryItem';
import { Row, Container } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

class Inicio extends Component {
	constructor(){
		super();
		this.state = {
		}
	}

		
	render() {
		return(<div>
			<h1>INICIO</h1>
		</div>);
		
	}
}

export default Inicio;
