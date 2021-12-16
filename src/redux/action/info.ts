import { IService } from "../../util/model";


export const actionSetInfoData = (active: boolean, service?: IService, feature?: any) => {
    if (active) {
        return {
            type: 'SET_INFO_DATA',
            payload: {
                active: true,
                service,
                feature
            }
        }
    }
    return {
        type: 'SET_INFO_DATA',
        payload: {
            active: false,
            service: null,
            feature: null
        }

    }
}


