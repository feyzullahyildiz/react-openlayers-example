import { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { Tile } from 'ol/layer'
import { TileWMS } from 'ol/source'
import { MapContext } from '../MapContext'
import { WmsLayerContext } from './WmsLayerContext'
interface Props {
    url: string;
    layername: string[];
}
export default function WmsLayer(props: PropsWithChildren<Props>) {
    const map = useContext(MapContext)
    const t = useRef<Tile<TileWMS>>(new Tile())
    useEffect(() => {
        const tileLayer = t.current!;
        // console.log('props.layername', props.layername)
        tileLayer.setSource(new TileWMS({
            params: {
                layers: props.layername
            },
            url: props.url,
        }));
        tileLayer.setVisible(props.layername.length > 0)

        map.addLayer(tileLayer);

        return () => {
            map.removeLayer(tileLayer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const tileLayer = t.current!;
        tileLayer.setVisible(props.layername.length > 0);
        tileLayer.getSource().updateParams({
            layers: props.layername
        })
    }, [props.layername])


    
    return <WmsLayerContext.Provider value={t.current}>{props.children}</WmsLayerContext.Provider>;
}
