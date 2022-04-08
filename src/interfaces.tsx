export interface ITransportData {
    _id: number,
    name: string,
    from_: string,
    to_: string,
    drivers: number[],
    cargo: number,
    total: number,
    state: string,
    addedby: string,
    added: string,
    lastmodified: string,
    modifiedby: string
    statuses: ITransportStatus[]

}

export interface ICargoData{
    _id: number,
    name: string,
    weight: number,
    weightunit: string,
    quantity: number,
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


export interface ITransportFormState{
    name: string
    from_: string,
    to_: string,
    drivers: number[]
    cargo: number
} 

export enum states {"Waiting for dispatch", "Moving", "Taking a short break", "Break to sleep",
 "Stuck in the traffic jam", "Malfunction of the vehicle" }

export interface ITransportStatus {
    _id: number,
    transportid: number,
    state: states,
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
