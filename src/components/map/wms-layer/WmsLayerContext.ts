import React from "react";

import Tile from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

export const WmsLayerContext = React.createContext<Tile<TileWMS> | null>(null);

