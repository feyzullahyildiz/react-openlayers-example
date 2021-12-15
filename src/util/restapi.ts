import axios from "axios";
import { IServicesResponse } from "./model";


async function getServices() {
    const res = await axios.get<IServicesResponse>('https://kampus.ankageo.com/rest/v1/services')
    return res.data;
}

export const RestApi = {
    getServices
}

