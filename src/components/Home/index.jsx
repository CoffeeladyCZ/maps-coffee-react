import Map from "../../common/Map/AppMap";
import List from "../List/AppList";
import Navigation from '../Navigation/AppNavigation';

import './index.scss';

const Home = () => <>
    <Navigation />
    <Map height='540' />
    <List />
</>

export default Home;