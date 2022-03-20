import React from 'react';
import ModalWindow from '../Modal/ModalWindow';

import './AppListItem.scss';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isOpened: false
    }
  }

  showModal = () => {
    this.setState({ isOpened: true })
  }

  callback = (open) => {
    if (!open) {
      this.setState({ isOpened: false })
    }
  }
  
  render() {
    const { name, address, time, content, activeCoffee } = this.props;
    const contentModal = `
      ${name}\n
      ${address}\n
      ${time}
    `
    const isOpened = this.state.isOpened;
    let modal;
    if (isOpened) {
      modal = <ModalWindow opened content={contentModal} callback={this.callback}/>
    }

    return(
      <div className={`coffee-list ${activeCoffee}`}>
        <h4 className='list-name'>{name}</h4>
        <p className='list-adress'>{address}</p>
        <p className='list-time'>{time}</p>
        <div className='list-container'>
          <div className='list'>
            <p className='list-title' onClick={this.showModal}>Další informace</p>
            <p className='list-text'>{content}</p>
          </div>
        </div>
        {modal}
      </div>
    )
  }
}

export default ListItem;
