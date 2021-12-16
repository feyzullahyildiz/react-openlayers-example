import React, { useState } from 'react'
import View from '../map/view/View'
import Map from '../map/Map'
import WmsInfoByTag from '../map/wms-info-by-tag/WmsInfoByTag'
import WmsLayer from '../map/wms-layer/WmsLayer'
import { useAppSelector } from '../../redux/hooks'
import { RestApi } from '../../util/restapi'
import { Tile } from 'ol/layer';
import { TileWMS } from 'ol/source';
import Overlay from '../map/overlay/Overlay'
import { IService } from '../../util/model'
import { actionSetInfoData } from '../../redux/action/info'
import { useDispatch } from 'react-redux'

interface SelectedFeatureWithService {
    service: IService,
    features: any[];
}

export default function MapContainer() {

    const [selectedFeatures, setSelectedFeatures] = useState<SelectedFeatureWithService[]>([]);
    const [selectedCoordinate, setSelectedCoordinate] = useState<number[] | null>(null);
    const serviceList = useAppSelector(state => state.wms.serviceList);
    const dispatch = useDispatch()
    async function onWmsSelected(arr: { url: string, wms: Tile<TileWMS> }[], coordinate: number[]) {
        if (arr.length === 0) {
            setSelectedCoordinate(null);
            setSelectedFeatures([])
            return;
        }
        const result = await RestApi.getGeojsonFromGetFeatureInfoUrlArray(arr.map(a => a.url));

        setSelectedCoordinate(coordinate);
        const features = result
            .filter(r => r.length > 0)
            .map((features, i) => {
                const wms = arr[i].wms
                const service = serviceList.find(ss => ss.id === wms.get('serviceId'))!
                return { service, features }
            });
        console.log('features', features);
        setSelectedFeatures(
            features
        )

    }

    function onFeatureSelect(service: IService, feature: any) {
        dispatch(
            actionSetInfoData(true, service, feature)
        )
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
                {
                    selectedFeatures.length > 0 &&
                    selectedCoordinate &&
                    selectedCoordinate.length === 2 &&
                    <Overlay x={selectedCoordinate[0]} y={selectedCoordinate[1]}>
                        {selectedFeatures
                            .map(ss => <div key={ss.service.id}>
                                <h4>{ss.service.alias}</h4>
                                {ss.features.map((f, i) => {
                                    return <div key={i}
                                        onClick={() => onFeatureSelect(ss.service, f)}
                                    >{f.properties.adi}</div>
                                })}
                            </div>
                            )}
                    </Overlay>
                }
            </Map>
        </View>
    )
}

