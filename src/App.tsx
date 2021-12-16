import React, { useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { actionInitWmsLayers } from './redux/action/wms';
import MapContainer from './components/map-container/MapContainer';
import './App.scss';
import InfoViewer from './components/info-viewer/InfoViewer';
import { useAppSelector } from './redux/hooks';

function App() {

  const dispatch = useDispatch()
  const infoData = useAppSelector(state => state.info)
  useEffect(() => {
    dispatch(actionInitWmsLayers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="map-container">
        <MapContainer />
      </div>
      {infoData.active && <div className="info-viewer">
        <InfoViewer />
      </div>}
    </div>
  );
}

export default App;
