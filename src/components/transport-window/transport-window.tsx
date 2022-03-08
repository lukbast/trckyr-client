import { FC } from "react"
import { ITransportData } from "../main-tab/interfaces"
import "./transport-window.scss"

interface IProps {
    data: ITransportData,
}



const TransportWindow:FC<IProps> = ({data}):JSX.Element =>{

    const displayDrivers = ():JSX.Element =>{
        const drivers = data.drivers
        let string = "Drivers: "
        let i = 0
        for (let i = 0; i < drivers.length; i ++){
            string += drivers[i]
            if (i < drivers.length -1){
                string+= ", "
            }
        }
        return <div>{string}</div>
    }

    return(
        <div className="transport-window">
            <div>Name: {data.name}</div>
            <div>Cargo: {data.cargo}</div>
            <div>From: {data.from}</div>
            <div>To: {data.to}</div>
            <div>Eta: {data.eta}</div>
            <div>Remaining: {data.remaining}</div>
            <div>{displayDrivers()}</div>
        </div>
    )
}

export default TransportWindow