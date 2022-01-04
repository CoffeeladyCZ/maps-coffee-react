import React from 'react';

class Marker extends React.Component {
  render() {
    const { icon } = this.props;
    const animationMarker = (event) => {
      console.log('animation', event.target);
     
    }
  
    return (
      <div onClick={animationMarker}>
        <img src={icon} alt='coffeehouse'></img>
      </div>
    )
  }
}

export default Marker;


