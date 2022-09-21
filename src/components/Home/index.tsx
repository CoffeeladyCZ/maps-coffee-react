import Map from "../../common/Map/AppMap";
import CafeList from "../List/CafeList";
import Navigation from '../Navigation/AppNavigation';

import './index.scss';

const Home: React.FC = () => <>
  <Navigation />
  <Map height='350' />
  <CafeList />
</>

export default Home;
