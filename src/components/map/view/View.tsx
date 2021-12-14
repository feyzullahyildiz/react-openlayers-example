import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { ViewContext } from '../ViewContext'
import OlView from 'ol/View';
interface Props {
    centerX: number;
    centerY: number;
    zoom: number;
}
export default function View(props: PropsWithChildren<Props>) {

    // const [view, setView] = useState(new OlView())
    const viewRef = useRef(new OlView())

    useEffect(() => {
        const view = viewRef.current!;
        view.setCenter([props.centerX, props.centerY]);
    }, [props.centerX, props.centerY]);

    useEffect(() => {
        const view = viewRef.current!;
        view.setZoom(props.zoom);
    }, [props.zoom]);

    return <ViewContext.Provider value={viewRef.current}>
        {props.children}
    </ViewContext.Provider>;
    
}
