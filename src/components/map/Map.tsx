import React, { useEffect, PropsWithChildren, useState } from 'react'
import { Map as OlMap, View, } from 'ol'
import { OSM } from 'ol/source'
import { Tile } from 'ol/layer'
import './Map.scss';
import { MapContext } from './MapContext';

interface Props { }

export default function Map(props: PropsWithChildren<Props>) {
    const [olMap, setOlMap] = useState<OlMap | null>(null)
    useEffect(() => {
        const map = new OlMap({
            view: new View({
                center: [0, 0],
                zoom: 2
            }),
            target: 'map',
            layers: [
                new Tile({ source: new OSM() })
            ],
        });
        setOlMap(map);
        return () => {
            map.dispose();
        }
    }, []);
    return (
        <>
            <div className='Map' id="map"></div>
            {
                olMap &&
                <MapContext.Provider value={olMap}>
                    {props.children}
                </MapContext.Provider>
            }
        </>
    )
}
