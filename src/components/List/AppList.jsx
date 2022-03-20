import React from 'react';

import ListItem from '../ListItem/AppListItem';

import { listCoffeehouse } from '../../data/data';

class List extends React.Component {
  render() {
    const { district } = this.props;
    const activeCoffee = this.props;
   
    return (
      <div className='app-list'>
        {
          listCoffeehouse.filter(coffeehouse => coffeehouse.district === district)
          .map(coffeehouse => {
             return <ListItem 
              key={coffeehouse.name}
              name={coffeehouse.name}
              address={coffeehouse.address}
              time={coffeehouse.time}
              content={coffeehouse.content}
              activeCoffee={activeCoffee === coffeehouse.name ? 'active-class' : ''}
            />
          }
        )}
      </div>
    )
  }
}

export default List;
