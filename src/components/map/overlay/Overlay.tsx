import { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import OlOverlay from 'ol/Overlay';
import { MapContext } from '../MapContext';
import './Overlay.scss';
import ReactDOM from 'react-dom';
interface Props {
    x: number;
    y: number;
}
export default function Overlay(props: PropsWithChildren<Props>) {

    const map = useContext(MapContext)
    const elRef = useRef(document.createElement('div'));
    const overlayRef = useRef(new OlOverlay({}));
    useEffect(() => {
        const overlay = overlayRef.current!;
        map.addOverlay(overlay);
        document.getElementById('modal-root')!.append(elRef.current)
        overlay.setElement(elRef.current);
        return () => {
            map.removeOverlay(overlay)
            // eslint-disable-next-line react-hooks/exhaustive-deps
            elRef.current!.remove();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const overlay = overlayRef.current!;
        overlay.setPosition([props.x, props.y]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.x, props.y]);

    
    return ReactDOM.createPortal(
        <div className='Overlay'>
            {props.children}
        </div>
        , elRef.current
    );
}
