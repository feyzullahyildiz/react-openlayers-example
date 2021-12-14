import React, { createRef, PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { Tile } from 'ol/layer'
import { TileWMS } from 'ol/source'
import { MapContext } from '../MapContext'
import { WmsLayerContext } from './WmsLayerContext'
interface Props {
    url: string;
    layername: string[];
    visible: boolean;
}
export default function WmsLayer(props: PropsWithChildren<Props>) {
    const map = useContext(MapContext)
    const t = useRef<Tile<TileWMS>>(new Tile())
    useEffect(() => {
        const tileLayer = t.current!;
        tileLayer.setSource(new TileWMS({
            params: {
                layers: props.layername
            },
            url: props.url,
        }));
        tileLayer.setVisible(props.visible)

        map.addLayer(tileLayer);

        console.log('INIT')
        return () => {
            console.log('DESTROY')
            map.removeLayer(tileLayer);
        }
    }, []);

    useEffect(() => {
        const tileLayer = t.current!;
        tileLayer.setVisible(props.visible)
    }, [props.visible])
    return <WmsLayerContext.Provider value={t.current}>{props.children}</WmsLayerContext.Provider>;
}
