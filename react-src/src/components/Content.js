import React, { Component } from 'react';
import './Content.css';
import { Container } from 'reactstrap';
import Categories from './Categories.js';

// sidebar
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';

	var items = [
		<SidebarItem hoverHighlight='#102372' textAlign='center'><h2>GUIA CM</h2></SidebarItem>,
		<SidebarItem>Categorias</SidebarItem>,
		<SidebarItem>Eventos</SidebarItem>,
		<SidebarItem>Mapa</SidebarItem>,
	];


class Content extends Component {
	render() {
		return (
			<Container>
				<div className="Content-Title">
					<h3>Conteudo</h3>
				</div>
				<div id="content-body">
					{this.props.children}
				</div>
			</Container>	
		);
	}
}

export default Content;
