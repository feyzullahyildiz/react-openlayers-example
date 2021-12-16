import React from 'react'
import { useAppSelector } from '../../redux/hooks';
import './InfoViewer.scss';

export default function InfoViewer() {
    const infoData = useAppSelector(state => state.info);
    if (!infoData.active) {
        return (
            <div className='InfoViewer'>
                DATA YOK
            </div>
        )
    }
    const service = infoData.service!;
    const feature = infoData.feature!;
    const layerName = (feature.id as string).split('.')[0];
    const layer = service.layers.find(l => l.name === layerName)!;

    return (
        <div className='InfoViewer'>
            <h2>{service.alias}</h2>
            {/* <h2>{feature.properties}</h2> */}
            {/* {service.} */}
            {
                layer.fields
                    .filter(ff => !['geom', 'id'].includes(ff.name))
                    .map(ff => {
                        return <div className='field' key={ff.id}>
                            <span>{ff.alias}</span>
                            <span>{feature.properties[ff.name]}</span>
                        </div>
                    })}
        </div>
    )
}
