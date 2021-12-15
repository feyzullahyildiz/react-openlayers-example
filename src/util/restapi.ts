import axios from "axios";
import { IServicesResponse } from "./model";


async function getServices() {
    const res = await axios.get<IServicesResponse>('https://kampus.ankageo.com/rest/v1/services')
    return res.data;
}

async function getGeojsonFromGetFeatureInfoUrlArray(urlArray: string[]) {
    const result = await Promise.all(
        urlArray.map(url => axios.get(url).then(res => res.data.features))
    )
    return result;
}
export const RestApi = {
    getServices,
    getGeojsonFromGetFeatureInfoUrlArray,
}

