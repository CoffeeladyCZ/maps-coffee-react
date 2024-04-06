import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const appElement = document.getElementById('app');
const root = createRoot(appElement ? appElement : document.createElement('div'));

root.render(<App />);

reportWebVitals();
