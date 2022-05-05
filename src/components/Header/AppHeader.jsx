import {
  faArrowRightToBracket,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePopUp, usePopUpContextSubmit, useTogglePopup } from '../../contexts/PopupContext';

import PopUp from '../PopUp/PopUp';

import './AppHeader.scss';

import coffeeCup from './coffee-cup.png';

const Header = () => {
  const popUpSubmited = usePopUp();
  const togglePopUp = useTogglePopup();
  const isSubmited = usePopUpContextSubmit();
  const icon = isSubmited ? faRightFromBracket : faArrowRightToBracket;
  return (
    <header className='app-header'>
      <FontAwesomeIcon
        icon={icon}
        size='lg'
        className='sign-icon'
        onClick={togglePopUp}
      />
      {popUpSubmited && <PopUp />}
      <h1>Mapa kaváren</h1>
      <p className='claim'>... tady se jede jenom výběrovka</p>
      <img className='coffee-cup' src={coffeeCup} alt='coffee cup' />
    </header>
  );
};

export default Header;
