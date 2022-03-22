import { FC } from "react"
import { useCargoDataContext } from "../../context/cargo-data-context"
import { useDriverDataContext } from "../../context/driver-data-context"
import { ITransportData } from "../../interfaces"
import "./transport-window.scss"

interface IProps {
    data: ITransportData,
}



const TransportWindow:FC<IProps> = ({data}):JSX.Element =>{

    const cargoDataContext = useCargoDataContext()
    const driversDataContext = useDriverDataContext()

    const displayDrivers = ():JSX.Element =>{
        const drivers = data.drivers.map( (id) => driversDataContext.state[id]) 
        let string = "Drivers: "
        for (let i = 0; i < drivers.length; i ++){
            string += `${drivers[i].firstName} ${drivers[i].lastName} `
            if (i < drivers.length -1){
                string+= ", "
            }
        }
        return <div>{string}</div>
    }

    const displayCargo = ():JSX.Element =>{
        const cargo = cargoDataContext.state.data[data.cargo].name
        return <div>Cargo: {cargo}</div>
    }

    return(
        <div className="transport-window">
            <div>Name: {data.name}</div>
            {displayCargo()}
            <div>From: {data.from}</div>
            <div>To: {data.to}</div>
            <div>Eta: {data.eta}</div>
            <div>Remaining: {data.remaining}</div>
            <div>{displayDrivers()}</div>
        </div>
    )
}

export default TransportWindow