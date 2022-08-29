import React from 'react';
import ReactDOM from 'react-dom';
import i18next from './i18n'
import App from './App';
import './index.css';

i18next.t('t');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
