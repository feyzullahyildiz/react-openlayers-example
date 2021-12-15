import { IService } from "../../util/model";

interface InitialState {
    serviceList: IService[]
}
const initialState: InitialState = {
    serviceList: []
}
interface DefaultAction {
    type: string;
    payload?: any;
}
export const wmsReducer = (state = initialState, action: DefaultAction): InitialState => {
    if (action.type === 'SET_WMS_LAYERS') {
        return {
            ...state,
            serviceList: action.payload,
        }
    }
    if (action.type === 'CHANGE_WMS_LAYER_VISIBILITY') {
        const { serviceId, layerId, visible } = action.payload as { serviceId: number, layerId: number, visible: boolean};
        const serviceIndex = state.serviceList.findIndex(ss => ss.id === serviceId)
        if(serviceIndex === -1) {
            return state;
        }
        const service = state.serviceList[serviceIndex]!;
        const layerIndex = service.layers.findIndex(l => l.id === layerId)
        if(layerIndex === -1) {
            return state;
        }
        const layer = service.layers[layerIndex];
        const newServiceList = state.serviceList.concat();

        const newLayers = service.layers.concat();
        newLayers[layerIndex] = {
            ...layer,
            visible
        }
        newServiceList[serviceIndex] = {
            ...service,
            layers: newLayers
        }
        return {
            ...state,
            serviceList: newServiceList
        }
    }
    return state;
}