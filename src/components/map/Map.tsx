import React, { useEffect } from 'react'
import { Map as OlMap, View, } from 'ol'
import { OSM } from 'ol/source'
import { Tile } from 'ol/layer'
import './Map.scss';
export default function Map() {


    useEffect(() => {
        const map = new OlMap({
            view: new View({
                center: [0, 0],
                zoom: 2
            }),
            target: 'map',
            layers: [
                new Tile({source: new OSM()})
            ],
        });
        return () => {
            map.dispose();
        }
    }, [])
    return (
        <div className='Map' id="map">
            
        </div>
    )
}
