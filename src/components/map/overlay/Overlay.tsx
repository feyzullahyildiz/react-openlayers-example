import { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import OlOverlay from 'ol/Overlay';
import { MapContext } from '../MapContext';
import './Overlay.scss';
interface Props {
    x: number;
    y: number;
}
export default function Overlay(props: PropsWithChildren<Props>) {

    const map = useContext(MapContext)
    const elRef = useRef(document.createElement('div'));
    const overlayRef = useRef(new OlOverlay({ }));
    useEffect(() => {
        const overlay = overlayRef.current!;
        map.addOverlay(overlay);
        overlay.setElement(undefined);
        overlay.setElement(elRef.current);
        return () => {
            map.removeOverlay(overlay)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const overlay = overlayRef.current!;
        overlay.setPosition([props.x, props.y]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.x, props.y]);

    return <div className='Overlay' ref={elRef}>
        {props.children}
    </div>


}
