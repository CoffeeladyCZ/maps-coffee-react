import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from 'react';

import './AppSelect.scss';

const Select = (props) => {
  const [select, setSelect] = useState(false);
  const [selectItem, setSelectItem] = useState('Lokalita');

  function lastSelectItem(item) {
    setSelectItem(item.name);
    setSelect(false);
  }
  
  function handleBlur(e) { 
    console.log('blur event');
    setSelect(false);
  }

  let icon;
  if (select) {
    icon = <FontAwesomeIcon icon={faAngleUp} size='lg' className='select-icon' />
  } else {
    icon = <FontAwesomeIcon  icon={faAngleDown} size='lg' className='select-icon' />
  }

  return (
    <div className='select'  onBlur={() => handleBlur}>
      <div className={select ? 'select-header-active' : 'select-header'} onClick={() => setSelect(select => !select)}>
        <p>{selectItem}</p>
        {icon}
      </div>
      <div className={select ? 'select-active' : 'select-body'}>
        {props.selectItems.map(item => {
          return ( 
            <div 
              key={item.name}
              className={item.name === selectItem ? 'select-item-active' : 'select-item'}
              onClick={() => lastSelectItem(item)}
            >
              {item.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Select;
