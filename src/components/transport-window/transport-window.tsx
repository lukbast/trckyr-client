import { FC } from "react"
import { useCargoDataContext } from "../../context/cargo-data-context"
import { useDriverDataContext } from "../../context/driver-data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { ActionTypes, useTransportDataContext } from "../../context/transport-data-context"
import {  useWindowState } from "../../context/window-context"
import { ITransportData } from "../../interfaces"
import Button from "../button/button"
import EditTransportForm from "../edit-transport-form/edit-transport-form"
import "./transport-window.scss"

interface IProps {
    data: ITransportData,
}


const TransportWindow:FC<IProps> = ({data}):JSX.Element =>{

    const cargoDataContext = useCargoDataContext()
    const driversDataContext = useDriverDataContext()
    const windowContext = useWindowState()
    const transportDataContext = useTransportDataContext()
    const selectedTransportContext = useSelectedTransport()

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

    const displayEditTransportForm = () =>{
        windowContext.dispatch("openEditTransport")
    }

    const deleteTransport = () =>{
        const i = selectedTransportContext.state.index
        selectedTransportContext.dispatch(0)
        transportDataContext.dispatch({type: ActionTypes.DELETE_TRANSPORT, payload: transportDataContext.state[i]})

        windowContext.dispatch("openTransport")

    }

    const renderTransportWindow = ():JSX.Element =>{
        let isData:boolean = false
        if(transportDataContext.state.length > 0) isData = true
        if (!isData) windowContext.dispatch("openNewTransport")
        if (windowContext.state.transportWindow){
            return (isData? <div className="transport-window">
                    <Button text="edit transport" onClick={displayEditTransportForm}/>
                    <Button text="Delete transport" onClick={deleteTransport}/>
                    <div>Name: {data.name}</div>
                    {displayCargo()}
                    <div>From: {data.from}</div>
                    <div>To: {data.to}</div>
                    <div>Eta: {data.eta}</div>
                    <div>Remaining: {data.remaining}</div>
                    <div>{displayDrivers()}</div>
            </div>: <div className="transport-window"></div>)
        }

        return <EditTransportForm/>
    }

    return( renderTransportWindow())
}

    

export default TransportWindow