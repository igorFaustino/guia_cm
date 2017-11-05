import React, {Component} from 'react';
import Carousel from 'nuka-carousel';
import coffe from '../img/cafeteria.jpg';

class Carrossel extends React.Component {
  //redimensiona o carrossel depois da imagem ser carregada para evitar o problema do carrossel ficar com tamanho 0
  _handleImageLoaded(){
    setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  render(){
    var settings = {
      autoplay: true,
      autoplayInterval: 10000,
      cellSpacing: 20,
      wrapAround: true,
    };

    return (
      <Carousel {...settings}>
        <img src={require('../img/cafeteria.jpg')} onLoad={this._handleImageLoaded}/>
        <img src={coffe}/>
        <img src={coffe}/>
        <img src={coffe}/>
        <img src={coffe}/>
        <img src={coffe}/>
      </Carousel>
    );
  }
}

export default Carrossel;