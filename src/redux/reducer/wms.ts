
interface InitialState {
    layers: {
        url: string;
        layername: string[];
        visible: boolean;
    }[]
}
const initialState: InitialState = {
    layers: []
}
interface DefaultAction {
    type: string;
    payload?: any;
}
export const wmsReducer = (state = initialState, action: DefaultAction): InitialState => {
    if (action.type === 'SET_WMS_LAYERS') {
        return {
            ...state,
            layers: action.payload,
        }
    }
    if (action.type === 'CHANGE_WMS_LAYER_VISIBILITY') {
        const { index, visible } = action.payload as { index: number, visible: boolean };
        const item = state.layers[index];
        if(!item) {
            return state;
        }
        state.layers[index] = {
            ...item,
            visible
        }
        return {
            ...state,
            layers: [...state.layers]
        }
    }
    return state;
}