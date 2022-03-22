export interface ITransportData {
    name: string,
    from: string,
    to: String,
    drivers: number[],
    cargo: number,
    quantity: string,
    total: number,
    remaining: number,
    eta: string,
    state: string,
    coordinates: number[]
}

export interface ICargoData{
    _id: number,
    name: string,
    weight: number,
    weightUnit: string,
    quantity: number,
    quantityUnit: string,
    info: string
}

export interface IDriverData{
    _id: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string
}