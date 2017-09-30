import React, {Component} from 'react';
import Carousel from 'nuka-carousel';
import coffe from '../img/cafeteria.jpg';

class Carrossel extends React.Component {
  render(){
    var settings = {
      autoplay: true,
      autoplayInterval: 10000,
      cellSpacing: 20,
      wrapAround: true,
    };
    return (
      <Carousel {...settings}>
        <img src={require('../img/cafeteria.jpg')}/>
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