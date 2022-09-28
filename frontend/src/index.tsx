
import ReactDOM from 'react-dom/client';
import './index.css';

import AppContainer from './containers/AppContainer'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <AppContainer />
  // </React.StrictMode>
);

