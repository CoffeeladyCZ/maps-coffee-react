import React from 'react';

import './AppListItem.scss';

class ListItem extends React.Component {

  showModal() {
    console.log('click');
  }

  render() {
    const { name, address, time, content, activeCoffee } = this.props;

    return(
      <div className={`coffee-list ${activeCoffee}`}>
        <h4 className="list-name">{name}</h4>
        <p className="list-adress">{address}</p>
        <p className="list-time">{time}</p>
        <div className="list-container">
          <div className="list">
            <p className="list-title" onClick={this.showModal}>Další informace</p>
            <p className="list-text">{content}</p>
            {/* <div class="container-image">
              <img class="list-image" src="{photo}" />
              <img class="list-image" src="${image}" />
              <img class="list-image" src="${image}" />
            </div> */}

            {/* <div className="list-toggle">
              <i className="fas fa-chevron-down"></i>
              <i className="fas fa-times"></i>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem;
