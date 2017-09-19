import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Content from './components/Content.js';
import { Container } from 'reactstrap';

import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

// sidebar
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

import Categories from './components/Categories.js';
import Category from './components/Category.js';

	var items = [
		<SidebarItem hoverHighlight='#102372' textAlign='center'><h2><Link to="/">GUIA CM</Link></h2></SidebarItem>,
		<SidebarItem><Link to="/categorias">Categorias</Link></SidebarItem>,
		<SidebarItem><Link to="/eventos">Eventos</Link></SidebarItem>,
		<SidebarItem>Mapa</SidebarItem>,
	];

class App extends Component {


	render() {
		return (
			<Router>
				<Sidebar content={items} background='#102372'>
					<Container>
						<Route exact path="/" component={Categories}/>
						<Route exact path="/categorias" component={Categories}/>
						<Route exact path="/categorias/:categoria" component={Category}/>
					</Container>
				</Sidebar>
			</Router>
		);
	}
}

export default App;
