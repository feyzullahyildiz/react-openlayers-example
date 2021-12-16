import React from 'react'
import View from '../map/view/View'
import Map from '../map/Map'
import WmsInfoByTag from '../map/wms-info-by-tag/WmsInfoByTag'
import WmsLayer from '../map/wms-layer/WmsLayer'
import { useAppSelector } from '../../redux/hooks'
import { RestApi } from '../../util/restapi'
import { Tile } from 'ol/layer';
import { TileWMS } from 'ol/source';
import Overlay from '../map/overlay/Overlay'
export default function MapContainer() {


    const serviceList = useAppSelector(state => state.wms.serviceList);
    // const dispatch = useDispatch()
    async function onWmsSelected(arr: { url: string, wms: Tile<TileWMS> }[],) {
        if (arr.length === 0) {
            return;
        }
        const result = await RestApi.getGeojsonFromGetFeatureInfoUrlArray(arr.map(a => a.url));
        const service = serviceList.find(ss => ss.id === arr[0].wms.get('serviceId'))
        console.log(service, arr[0].wms, arr[0].wms.get('serviceId'), result[0])

    }

    return (
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
                <Overlay x={3265008} y={4674636}>
                    BLA BLA
                    <div>DENEME</div>
                    <button>DENEME</button>
                </Overlay>
                <Overlay x={3365000} y={4674636}>
                    BLA BLA
                </Overlay>
            </Map>
        </View>
    )
}
