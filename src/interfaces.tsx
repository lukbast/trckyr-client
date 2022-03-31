export interface ITransportData {
    _id: number,
    name: string,
    from: string,
    to: string,
    drivers: number[],
    cargo: number,
    total: number,
    state: string,
    addedBy: string,
    added: string,
    lastModified: string,
    statuses: ITransportStatus[]

}

export interface ICargoData{
    _id: number,
    name: string,
    weight: number,
    weightUnit: string,
    quantity: number,
    quantityUnit: string,
    info: string,
    addedBy: string,
    added: string,
    lastModified: string,
}

export interface IDriverData{
    _id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    addedBy: string,
    added: string,
    lastModified: string
}

export interface ITransportFormState{
    name: string
    from: string,
    to: string,
    drivers: number[]
    cargo: number
} 

export enum states {"Waiting for dispatch", "Moving", "Taking a short break", "Break to sleep",
 "Stuck in the traffic jam", "Malfunction of the vehicle" }

export interface ITransportStatus {
    _id: number,
    transportID: number,
    state: states,
    begginingOfState: string,
    endOfState: string,
    duration: string,
    remaining: number,
    eta: string,
    coordinates: number[]
}