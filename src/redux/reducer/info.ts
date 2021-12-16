import { IService } from "../../util/model";

interface InitialState {
    service: IService | null;
    feature: any| null;
    active: boolean;
}
const initialState: InitialState = {
    active: false,
    feature: null,
    service: null,
}
interface DefaultAction {
    type: string;
    payload?: any;
}
export const infoReducer = (state = initialState, action: DefaultAction): InitialState => {
    if (action.type === 'SET_INFO_DATA') {
        const paylaod = action.payload as InitialState;
        return paylaod;
        // return {
        //     ...paylaod,
        // }
    }
    return state;
}