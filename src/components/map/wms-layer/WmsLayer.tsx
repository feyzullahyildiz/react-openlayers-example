import React, { useContext, useEffect } from 'react'
import { Tile } from 'ol/layer'
import { TileWMS } from 'ol/source'
import { MapContext } from '../MapContext'
interface Props {
    url: string;
    layername: string[];
    visible: boolean;
}
export default function WmsLayer(props: Props) {
    const map = useContext(MapContext)

    useEffect(() => {
        const tileLayer = new Tile({
            source: new TileWMS({
                params: {
                    layers: props.layername
                },
                url: props.url,
            }),
            visible: false
        });
        map.addLayer(tileLayer);

        return () => {
            map.removeLayer(tileLayer);
        }
    }, []);

    return null;
}
