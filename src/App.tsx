import React, { useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Map from './components/map/Map';
import './App.scss';
import WmsLayer from './components/map/wms-layer/WmsLayer';
import { useAppSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { actionInitWmsLayers } from './redux/action/wms';
import View from './components/map/view/View';
import WmsGetFeatureInfo from './components/map/wms-getfeatureinfo/WmsGetFeatureInfo';

function App() {

  const serviceList = useAppSelector(state => state.wms.serviceList);
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
            {serviceList.map(ss =>
              <WmsLayer
                key={ss.id}
                url={ss.url + '/wms'}
                layername={ss.layers.filter(l => l.visible).map(l => l.name)}
              >
                {<WmsGetFeatureInfo />}
              </WmsLayer>
            )}

          </Map>
        </View>
      </div>
    </div>
  );
}

export default App;
