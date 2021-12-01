import './App.css';
import Header from './components/Header/AppHeader';
import Footer from './components/Footer/AppFooter';
import Map from './components/Map/AppMap';
import Navigation from './components/Navigation/AppNavigation';


function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Map />
      <Footer/>
    </div>
  );
}

export default App;
