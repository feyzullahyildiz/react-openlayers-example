import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/map/Map';
import './App.scss';
import WmsLayer from './components/map/wms-layer/WmsLayer';
import { useAppSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { actionInitWmsLayers } from './redux/action/wms';

function App() {
  
  const wmsLayers = useAppSelector(state => state.wms.layers);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionInitWmsLayers())
  }, []);
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="map-container">
        <Map>
          {wmsLayers.map(a =>
            <WmsLayer
              key={a.url + a.layername}
              url={a.url}
              layername={a.layername}
              visible={a.visible}></WmsLayer>
          )}

        </Map>
        <Map>
          {wmsLayers.map(a =>
            <WmsLayer
              key={a.url + a.layername}
              url={a.url}
              layername={a.layername}
              visible={!a.visible}></WmsLayer>
          )}

        </Map>
      </div>
    </div>
  );
}

export default App;
