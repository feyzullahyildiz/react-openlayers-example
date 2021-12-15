import { RestApi } from "../../util/restapi";
import { AppDispatch } from "../store"


export const actionInitWmsLayers = () => async (dispatch: AppDispatch) => {
    try {
        const services = await RestApi.getServices()
        dispatch({
            type: 'SET_WMS_LAYERS',
            payload: services.services.services
        });
    } catch (error) {
        dispatch({
            type: 'SET_WMS_LAYERS',
            payload: []
        });
        
    }
}

export const actionChangeWmsLayerVisibility = (serviceId: number, layerId: number, visible: boolean) => {
    return {
        type: 'CHANGE_WMS_LAYER_VISIBILITY',
        payload: {
            serviceId, layerId, visible
        }
    }
}


