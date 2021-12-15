import React, { useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Map from './components/map/Map';
import './App.scss';
import WmsLayer from './components/map/wms-layer/WmsLayer';
import { useAppSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { actionInitWmsLayers } from './redux/action/wms';
import View from './components/map/view/View';
// import WmsGetFeatureInfo from './components/map/wms-getfeatureinfo/WmsGetFeatureInfo';
import WmsInfoByTag from './components/map/wms-info-by-tag/WmsInfoByTag';
import { Tile } from 'ol/layer';
import { TileWMS } from 'ol/source';
import { RestApi } from './util/restapi';

function App() {

  const serviceList = useAppSelector(state => state.wms.serviceList);
  const dispatch = useDispatch()
  async function onWmsSelected(arr: { url: string, wms: Tile<TileWMS> }[]) {
    // console.log(arr)
    const result = await RestApi.getGeojsonFromGetFeatureInfoUrlArray(arr.map(a => a.url))
    // console.log('result', result);
    const service = serviceList.find(ss => ss.id === arr[0].wms.get('serviceId'))
    console.log(service, arr[0].wms, arr[0].wms.get('serviceId'),  result[0])
  }
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
                // tag="wms-service"
                tag={ss.type}
                serviceId={ss.id}
                url={ss.url + '/wms'}
                layername={ss.layers.filter(l => l.visible).map(l => l.name)}
              >
                {/* <WmsGetFeatureInfo /> */}
              </WmsLayer>
            )}
            <WmsInfoByTag callback={onWmsSelected} tag="GEOSERVER_WRITE" />
          </Map>
        </View>
      </div>
    </div>
  );
}

export default App;
