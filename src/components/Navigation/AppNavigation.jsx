import React from 'react';

import './AppNavigation.scss';

const cityDistrict = [
  { name: 'All' },
  { name: 'Letná' },
  {  name: 'Karlín' },
  { name: 'Dejvice' },
  { name: 'Vinohrady' },
  { name: 'Nusle' },
  { name: 'Centrum' },
];

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      district: 'All',
      active: true,
  };
  }
  
  changeDistrict = (name) => {
    this.setState({
      district: name,
      active: this.state.active
    },
    () => {
      this.props.callback(name)
    }
    )

  };
  
  render() {
    
    return (
      <div className='navigation'>
        <ul className='navigation-menu'>
        {
          cityDistrict.map((item) =>
          <li 
            className={this.state.active && item.name === this.state.district ? 'active' : ''} 
            key={item.name} 
            onClick={() => this.changeDistrict(item.name)}>
            {item.name}
          </li>
          )
        }</ul>
      </div>
    );
  }
}

export default Navigation;
