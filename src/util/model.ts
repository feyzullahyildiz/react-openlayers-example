export interface IServicesResponse {
    success: boolean;
    version: string;
    services: {
        services: IService[];
    }
}

export interface IService {
    id: number;
    perm: number;
    priority: number;
    name: string;
    alias: string;
    alias_eng: string;
    url: string;
    type: string;
    workspace: string;
    description?: string;
    isactive: boolean;
    layers: Array<ILayer>;
}

export interface ILayer {
    id: number;
    priority: number;
    service_id: number;
    perm: number;
    name: string;
    alias: string;
    alias_eng: string;
    geomtype: string;
    icon: string;
    style: any;
    desription: any;
    public: boolean;
    visible: boolean;
}