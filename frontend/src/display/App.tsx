import React from 'react';
import './App.css';

import { handleSubmitClick} from '../features/functions'

function App() {
  return (
    <div className="App">
      <div className='app-container'>
        <div className='app-title'>Baobab Code Challenge</div>
        <div className='app-panel'>
          <form onSubmit={(e) => handleSubmitClick(e)}>
            <div className="app-input" role="presentation" aria-label="domainName">
                <input type='text' name="domainName" placeholder='enter domain name here' required />
            </div>
            <div className="app-input">
                <button type="submit" name="search-button" className="btn-app">Get Risk Assessment</button>
            </div>  
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
