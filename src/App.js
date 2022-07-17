import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer/AppFooter';

import Header from './components/Header/AppHeader';
import { PopUpStateProvider } from './contexts/PopupContext';
import { MapsStateProvider } from './contexts/MapsContext';
import MyRoutes from './routes/Routes';

import './App.scss';
import './index.css';

const App = () => {
  return (
    <MapsStateProvider>
      <PopUpStateProvider>
        <div className='app-container'>
          <Router>
            <Header />
            <MyRoutes />
            <Footer />
          </Router>
        </div>
      </PopUpStateProvider>
    </MapsStateProvider>
  );
};

export default App;
