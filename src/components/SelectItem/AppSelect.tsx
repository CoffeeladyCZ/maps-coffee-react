
import { useEffect, useRef, useState } from 'react';
import './AppSelect.scss';

import { KeyboardArrowDown } from '@mui/icons-material';

export interface SelectItemType {
  name: string;
};
export interface SelectNameType extends SelectItemType {
  value: string;
};


interface SelectProps {
  name: string;
  selectItems: SelectItemType[];
  selectName: SelectNameType[];
  value: string;
}
const Select: React.FC<SelectProps> = (props) => {
  const selectBody = useRef<HTMLDivElement>(null);
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

  function handleClickOutside(e: MouseEvent | KeyboardEvent): void {

    const target = e.target as Element;
    const type = e.type.toLowerCase();
    const clickedOutside = type === 'click' && !target.matches('.select, .select *');
    const escapePressed = type === 'keyup' && (e as KeyboardEvent).key.toLowerCase() === 'escape';
    (clickedOutside || escapePressed) && setIsOpened(false);
  }

  function lastSelectItem(item: SelectItemType) {
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
        <KeyboardArrowDown fontSize='large' className='select-icon' />
      </div>
      <div ref={selectBody} className='select-body'>
        {props.selectItems.map((item, index) => {
          return <div
            key={item.name}
            tabIndex={index}
            className={`select-item${
              item.name === selectedItem ? ' active' : ''
            }`}
            onClick={() => lastSelectItem(item)}
          >
            {item.name}
          </div>
        })}
      </div>
    </div>
  );
};

export default Select;
