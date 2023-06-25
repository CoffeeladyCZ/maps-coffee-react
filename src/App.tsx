import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer/AppFooter';

import Header from './components/Header/AppHeader';
import { PopUpStateProvider } from './contexts/PopupContext';
import { MapsStateProvider } from './contexts/MapsContext';
import MyRoutes from './routes/Routes';

import { Container } from '@mui/material';

import './App.scss';
import './index.css';

const App = () => {
  return (
    <MapsStateProvider>
      <PopUpStateProvider>
        <Container>
          <Router>
            <Header />
            <MyRoutes />
            <Footer />
          </Router>
        </Container>
      </PopUpStateProvider>
    </MapsStateProvider>
  );
};

export default App;
