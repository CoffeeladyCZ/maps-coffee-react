import React from 'react';
import { useTranslation } from "react-i18next";

import './AppFooter.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <p>t('')</p>
    </footer>
  )
}

export default Footer;
