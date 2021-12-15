import { useEffect, PropsWithChildren, useState, useRef, useContext } from 'react'
import { Map as OlMap, View, } from 'ol'
import { OSM } from 'ol/source'
import { Tile } from 'ol/layer'
import './Map.scss';
import { MapContext } from './MapContext';
import { ViewContext } from './view/ViewContext';


interface Props { }

export default function Map(props: PropsWithChildren<Props>) {
    const mapRef = useRef(document.createElement('div'))
    const [olMap, setOlMap] = useState<OlMap | null>(null);
    const view = useContext(ViewContext)
    useEffect(() => {
        const v = view || new View({
            center: [0, 0],
            zoom: 2
        });
        const map = new OlMap({
            view: v,
            target: mapRef.current,
            layers: [
                new Tile({ source: new OSM() })
            ],
        });
        setOlMap(map);
        return () => {
            map.dispose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className='Map' ref={mapRef}></div>
            {
                olMap &&
                <MapContext.Provider value={olMap}>
                    {props.children}
                </MapContext.Provider>
            }
        </>
    )
}
