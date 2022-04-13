

export interface ITransportData {
    _id: string,
    name: string,
    from_: string,
    to_: string,
    drivers: string[],
    cargo: string,
    total: string,
    state: string,
    addedby: string,
    added: string,
    lastmodified: string,
    modifiedby: string
    statuses: ITransportStatus[]
}
export interface ITransportForm{
    name: string
    from_: string,
    to_: string,
    drivers: string[]
    cargo: string
} 

export interface ICargoData{
    _id: number,
    name: string,
    weight: string,
    weightunit: string,
    quantity: string,
    quantityunit: string,
    info: string,
    addedby: string,
    added: string,
    lastmodified: string,
    modifiedby: string,
}

export interface ICargoForm{
    name: string,
    weight: string,
    weightunit: string,
    quantity: string,
    quantityunit: string,
    info: string,
}

export interface IDriverData{
    _id: number,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    addedby: string,
    added: string,
    lastmodified: string,
    modifiedby: string
}

export interface IDriverForm{
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
}

export interface IData {
    transport: ITransportData[],
    cargo : ICargoData[],
    drivers: IDriverData[]
}


export interface ITransportStatus {
    _id: number,
    transportid: number,
    state: string,
    begginingofstate: string,
    endofstate: string,
    duration: string,
    remaining: number,
    eta: string,
    coordinates: number[],
}

export enum FetchState {
    "DEFAULT",
    "LOADING",
    "SUCCESS",
    "ERROR"
}

export interface User {
    username: string,
    loggedIn: boolean
}
