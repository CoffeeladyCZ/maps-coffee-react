import React from "react";
import { useTranslation } from "react-i18next";

import './LanguageSwitcher.scss';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="switch">
      <switch
        value={i18n.language}
        onChange={(e) =>
          i18n.changeLanguage(e.target.value)
        }
      >
        <option value="cz">CZ</option>
        <option value="en">EN</option>
      </switch>
    </div>
  );
}

export default LanguageSwitcher;
