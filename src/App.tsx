import React from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/map/Map';

import './App.scss';
import WmsLayer from './components/map/wms-layer/WmsLayer';
const arr = [
  {
    url: 'https://kampus.ankageo.com/geoserver/kampus/wms',
    layername: ['Fakulte_usr'],
    visible: true,
  }
]
function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="map-container">
        <Map>
          {arr.map(a =>
            <WmsLayer
              key={a.url + a.layername}
              url={a.url}
              layername={a.layername}
              visible={a.visible}></WmsLayer>
          )}

        </Map>
      </div>
    </div>
  );
}

export default App;
