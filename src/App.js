import React from 'react';

import './App.css';

import Header from './components/Header/AppHeader';
import Navigation from './components/Navigation/AppNavigation';
import Footer from './components/Footer/AppFooter';
import Map from './components/Map/AppMap';
import List from './components/List/AppList';
import { PopUpStateProvider } from './contexts/PopupContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        districtParent:  'All',
        activeCoffee: ''
    }
  }

  callback = (name) => {
    this.setState({
      districtParent: name
    })
  }
  callbackClass = (name) => {
    this.setState({
      activeCoffee: name
    })
  }

  render () {
    return (
      <PopUpStateProvider>
        <div className="App">
          <Header />
          <Navigation
            callback={this.callback}
        />

          <section className="app-map">        
            <Map
              district={this.state.districtParent}
              callbackClass={this.callbackClass}
            />
            <List
              district={this.state.districtParent}
              activeCoffee={this.state.activeCoffee}
            />
          </section>
          <Footer/>
        </div>  
      </PopUpStateProvider>
    );
  }
}

export default App;
