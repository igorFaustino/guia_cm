import coffe from '../img/cafeteria.jpg';
var React = require('react');
var Carousel = require('nuka-carousel');

class Carrossel extends React.Component {
  render(){
    var settings = {
      dots: true,
    };
    return (
      <Carousel>
        <img src={coffe}/>
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