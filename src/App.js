import './App.css';
import Header from './components/Header/AppHeader';
import Navigation from './components/Navigation/AppNavigation';
import Footer from './components/Footer/AppFooter';
import Map from './components/Map/AppMap';
import List from './components/List/AppList';

import { listCoffeehouse } from "./data/data";
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        districtParent:  'All'
    }
  }

  callback = (name) => {
    this.setState({
      districtParent: name
    })
  }
  render () {
    return (
      <div className="App">
        <Header />
        <Navigation
          callback={this.callback}
       />

        <section className="app-map">        
          <Map
            district={this.state.districtParent}
           />
          <div className="list-coffeehouse">
            {
              listCoffeehouse.filter(coffeehouse => coffeehouse.district === this.state.districtParent)
              .map(coffeehouse =>
                <List 
                  key={coffeehouse.name}
                  name={coffeehouse.name}
                  address={coffeehouse.address}
                  time={coffeehouse.time}
                  content={coffeehouse.content}
                />
            )}
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default App;
