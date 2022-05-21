import React from 'react';

import './App.css';

import Header from './components/Header/AppHeader';
import Navigation from './components/Navigation/AppNavigation';
import Footer from './components/Footer/AppFooter';
import Map from './components/Map/AppMap';
import List from './components/List/AppList';
import { PopUpStateProvider } from './contexts/PopupContext';
import { MapsStateProvider } from './contexts/MapsContext';

const App = () => {
  return (
    <MapsStateProvider>
      <PopUpStateProvider>
        <div className="App">
          <Header />
          <Navigation />
          <section className="app-map">        
            <Map />
            <List />
          </section>
          <Footer/>
        </div>  
      </PopUpStateProvider>
    </MapsStateProvider> 
  );
}

export default App;
