import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/map/Map';
import './App.scss';
import WmsLayer from './components/map/wms-layer/WmsLayer';
import { useAppSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { actionInitWmsLayers } from './redux/action/wms';
import View from './components/map/view/View';
import WmsGetFeatureInfo from './components/map/wms-getfeatureinfo/WmsGetFeatureInfo';

function App() {

  const wmsLayers = useAppSelector(state => state.wms.layers);
  const dispatch = useDispatch()
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
        <View centerX={3265008} centerY={4674636} zoom={16}>
          <Map>
            {wmsLayers.map(a =>
              <WmsLayer
                key={a.url + a.layername}
                url={a.url}
                layername={a.layername}
                visible={a.visible}>
                  {a.visible && <WmsGetFeatureInfo />}
                </WmsLayer>
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
        </View>
      </div>
    </div>
  );
}

export default App;
