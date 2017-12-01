import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Carousel from 'nuka-carousel';
import coffe from '../img/cafeteria.jpg';

class Carrossel extends React.Component {
  constructor() {
    super();
    this.index = 0
  }

  //redimensiona o carrossel depois da imagem ser carregada para evitar o problema do carrossel ficar com tamanho 0
  _handleImageLoaded() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }


  render() {
    var settings = {
      autoplay: true,
      autoplayInterval: 10000,
      cellSpacing: 20,
      wrapAround: true,
    };

    return (
      <Carousel {...settings} afterSlide={(newSlideIndex) => { this.props.teste(newSlideIndex) }}>

        <img src='http://res.cloudinary.com/igor-faustino/image/upload/v1511331243/subway_oiaag1.jpg' onLoad={this._handleImageLoaded} />
        <img src='http://res.cloudinary.com/igor-faustino/image/upload/v1511370323/plan_mh9fxg.jpg' />
        <img src='http://res.cloudinary.com/igor-faustino/image/upload/v1511327982/bomdia_ahgle3.jpg' />
      </Carousel>
    );
  }
}

export default Carrossel;