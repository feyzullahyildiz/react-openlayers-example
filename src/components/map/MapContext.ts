import React from 'react';
import { Map as OlMap, } from 'ol'
export const MapContext = React.createContext<OlMap>(
    new OlMap({})
);

