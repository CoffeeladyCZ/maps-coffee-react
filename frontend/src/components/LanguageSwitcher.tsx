import React from "react";
import { useTranslation } from "react-i18next";

import './LanguageSwitcher.scss';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <label 
      className="switch"
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value) }
    >
      <input type="checkbox" role="switch">
      <span class="slider round"></span>
    </label>
     
    {/* <option value="cz">CZ</option>
    <option value="en">EN</option> */}
  );
}

export default LanguageSwitcher;
