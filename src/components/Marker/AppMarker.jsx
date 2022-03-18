import React from 'react';
import { Marker} from '@react-google-maps/api';
import MapInfoWindow from '../MapInfoWindow/MapInfoWindow';

class MarkerComponent extends React.Component {
  // if the props change from the outside
  static getDerivedStateFromProps(props, currentState) {
    if(props.infoVisible !== currentState.infoVisible) {
      return {
        infoVisible: props.infoVisible,
        zIndex: props.infoVisible ? 9999 : 1
      }
    } else return currentState
  }

  closeInfo = () => {
    this.setState({ infoVisible: false, zIndex: 1 });
  }

  pushUp = () => {
    this.setState({ zIndex: this.state.zIndex+1 })
  }

  pushDown = () => {
    this.setState({ zIndex: this.state.zIndex-1 })
  }

  constructor(props) {
    super(props);
    const { infoVisible } = props

    this.state = {
      infoVisible: infoVisible,
      zIndex: infoVisible ? 9999 : 1
    }
  }

  render() {
    const {
      props,
      closeInfo,
      state,
      pushUp,
      pushDown
    } = this;
    const { zIndex, infoVisible } = state;
    
    return (
      <Marker zIndex={zIndex} {...props} onMouseOver={pushUp} onMouseOut={pushDown} >
        { infoVisible ? <MapInfoWindow toggleClose={closeInfo} {...props} /> : null }
      </Marker>
    )
  }
}

export default MarkerComponent;
