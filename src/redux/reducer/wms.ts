
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

export const wmsReducer = (state = initialState, action: any) => {
    
    return state;
}