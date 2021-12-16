import { MapBrowserEvent } from 'ol';
import { Tile } from 'ol/layer';
import { TileWMS } from 'ol/source';
import { useContext, useEffect } from 'react'
import { MapContext } from '../MapContext';

interface Props {
    tag: string;
    // ingnoreTag?: boolean;
    callback: (arr: { url: string, wms: Tile<TileWMS> }[], coordinate: number[]) => void
}
export default function WmsInfoByTag(props: Props) {

    const map = useContext(MapContext)
    useEffect(() => {
        const onClick = (event: MapBrowserEvent<any>) => {
            // console.log('TIKLANDI', map, wms);
            const view = map.getView();
            const layers = map.getLayers().getArray()
                .filter(l => l.get('tag') === props.tag)
                .filter(l => l.getVisible())
                .map(l => {
                    const wms = l as Tile<TileWMS>;
                    const url = wms.getSource().getFeatureInfoUrl(
                        event.coordinate,
                        view.getResolution()!,
                        view.getProjection(),
                        {
                            QUERY_LAYERS: wms.getSource().getParams().layers,
                            info_format: 'application/json'
                        }
                    )!;
                    return { url, wms }
                })
            props.callback(layers, event.coordinate);
        }
        map.on('click', onClick)

        return () => {
            map.un('click', onClick)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.callback]);

    return null;
}
