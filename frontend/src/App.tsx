import { BrowserRouter as Router } from 'react-router-dom';
import { PopUpStateProvider } from './contexts/PopupContext';
import { MapsStateProvider } from './contexts/MapsContext';
import { I18nextProvider } from 'react-i18next';
import MyRoutes from './routes/Routes';
import i18n from './i18n';

import Footer from './components/Footer/AppFooter';
import Header from './components/Header/AppHeader';

import './App.scss';
import './index.css';

const App = () => {
  const { t } = useTranslation();
  return (
    <MapsStateProvider>
      <PopUpStateProvider>
        <I18nextProvider i18n={i18n}>
          <div className='app-container'>
            <Router>
              <Header />
              <MyRoutes />
              <Footer />
            </Router>
          </div>
        </I18nextProvider>
      </PopUpStateProvider>
    </MapsStateProvider>
  );
};

export default App;
