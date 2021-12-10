import React from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/map/Map';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="map-container">
        <Map></Map>
      </div>
    </div>
  );
}

export default App;
