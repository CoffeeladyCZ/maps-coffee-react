import {
  faArrowRightToBracket,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePopUp, usePopUpContextSubmit, useTogglePopup } from '../../contexts/PopupContext';

import LanguageSwitcher from '../Switcher/LanguageSwitcher';
import PopUp from '../PopUp/PopUp';

import './AppHeader.scss';

const Header = () => {
  const popUpSubmited = usePopUp();
  const togglePopUp = useTogglePopup();
  const isSubmited = usePopUpContextSubmit();
  const icon = isSubmited ? faRightFromBracket : faArrowRightToBracket;
  return (
    <header className='app-header'>
      <div className='icon-wrapper'>
        <LanguageSwitcher />
        <FontAwesomeIcon
          icon={icon}
          size='lg'
          className='sign-icon'
          onClick={togglePopUp}
        />
        {popUpSubmited && <PopUp />}
      </div>
      <div className='header__wrapper'>
        <h1>t('title')</h1>
        <p className='claim'>t('subtitle')</p>
      </div>      
    </header>
  );
};

export default Header;
