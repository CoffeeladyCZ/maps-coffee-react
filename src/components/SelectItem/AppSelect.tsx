import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import './AppSelect.scss';

const Select = (props) => {
  const selectBody = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Lokalita');
  const activeClass = isOpened ? ' active' : '';

  useEffect(() => {
    // component mounted
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keyup', handleClickOutside);

    return () => {
      // componetn unmounted
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keyup', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    const target = event.target;
    const type = event.type.toLowerCase();
    const clickedOutside = type === 'click' && !target.matches('.select, .select *');
    const escapePressed = type === 'keyup' && event.key.toLowerCase() === 'escape';
    (clickedOutside || escapePressed) && setIsOpened(false);    
  }

  function lastSelectItem(item) {
    setSelectedItem(item.name);
  }

  function toggle() {
    selectBody &&
      selectBody.current &&
      selectBody.current.style.setProperty(
        '--select-body-height',
        selectBody.current.scrollHeight + 'px'
      );
    setIsOpened(!isOpened);
  }

  return (
    <div onClick={toggle} className={`select${activeClass}`}>
      <div className='select-header' onClick={toggle}>
        <input readOnly type='text' value={selectedItem} name={props.name} />
        <FontAwesomeIcon icon={faAngleDown} size='lg' className='select-icon' />
      </div>
      <div ref={selectBody} className='select-body'>
        {props.selectItems.map((item, index) => {
          return (
            <div
              key={item.name}
              tabIndex={index}
              className={`select-item${
                item.name === selectedItem ? ' active' : ''
              }`}
              onClick={() => lastSelectItem(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Select;
