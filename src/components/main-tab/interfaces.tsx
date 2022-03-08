export interface ITransportData {
    name: string,
    from: string,
    to: String,
    drivers: string[],
    cargo: string,
    quantity: string,
    total: number,
    remaining: number,
    eta: string,
    state: string,
    coordinates: number[]
}