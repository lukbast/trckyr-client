import { FC } from "react"
import { useCargoDataContext } from "../../context/cargo-data-context"
import { useDriverDataContext } from "../../context/driver-data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { ActionTypes, useTransportDataContext, } from "../../context/transport-data-context"
import {  useWindowState } from "../../context/window-context"
import { ITransportData, ITransportStatus, states } from "../../interfaces"
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

    const displayEditTransportForm = () =>{
        windowContext.dispatch("openEditTransport")
    }

    const deleteTransport = () =>{
        const i = selectedTransportContext.state.index
        selectedTransportContext.dispatch(0)
        transportDataContext.dispatch({type: ActionTypes.DELETE_TRANSPORT, payload: transportDataContext.state[i]})

        windowContext.dispatch("openTransport")

    }
    const renderCargo = () => {
        const cargo = cargoDataContext.state[data.cargo - 1]
        
        return(
            <div className="table cargo hide-srollbars" >
                    <div className="title">Cargo</div>
                    <div className="row head">
                        <div className="field">ID</div>
                        <div className="field">Name</div>
                        <div className="field">Quantity</div>
                        <div className="field">Weight</div>
                    </div>
                    <div className="row">
                        <div className="field">{cargo._id}</div>
                        <div className="field">{cargo.name}</div>
                        <div className="field">{cargo.quantity} {cargo.quantityunit}</div>
                        <div className="field">{cargo.weight} {cargo.weightunit}</div>
                    </div>

                </div>
        )
    }

    const renderDrivers = () => {
        const drivers = data.drivers.map( (id) => driversDataContext.state[id])
        const rows = []
        for (let i = 0; i< drivers.length; i++){
            rows.push(<div className="row">
                        <div className="field">{drivers[i]._id}</div>
                        <div className="field">{drivers[i].lastname} {drivers[i].firstname}</div>
                        <div className="field">{drivers[i].phone}</div>
                        <div className="field">{drivers[i].email}</div>
                    </div>)
        }

        return(
            <div className="table drivers hide-srollbars" >
                <div className="title">Drivers</div>
                <div className="row head">
                    <div className="field">ID</div>
                    <div className="field">Name</div>
                    <div className="field">Phone</div>
                    <div className="field">Email</div>
                </div>
                {rows}
            </div>
        )
    }

    const renderStatuses = () => {
        const statues:ITransportStatus[] = data.statuses
        const rows = []
        for (let i = statues.length - 1; i> - 1; i--){
            rows.push(<div className="row">
                        <div className="field">{statues[i]._id}</div>
                        <div className="field">{statues[i].state}</div>
                        <div className="field">{statues[i].duration}</div>
                        <div className="field">{statues[i].begginingofstate}</div>
                        <div className="field">{statues[i].endofstate}</div>
                    </div>)
        }

        return(
            <div className="table states hide-srollbars" >
                <div className="title">Statuses</div>
                <div className="row head">
                    <div className="field">ID</div>
                    <div className="field">State</div>
                    <div className="field">Duration</div>
                    <div className="field">Beggining of state</div>
                    <div className="field">End of state</div>
                </div>
                {rows}
            </div>
        )
    }

    const renderTransportWindow = ():JSX.Element =>{
        let isData:boolean = false
        const lastStatusIndex:number = data.statuses.length - 1
        if(transportDataContext.state.length > 0) isData = true
        if (!isData) windowContext.dispatch("openNewTransport")
        if (windowContext.state.transportWindow){
            return (isData? <div className="transport-window hide-srollbars">
                <div className="section buttons-section">
                    <Button text="edit transport" onClick={displayEditTransportForm}/>
                    <Button text="Delete transport" onClick={deleteTransport}/>
                </div>
                <div className="section details">
                    <div className="row"><b>Name:</b> <span>{data.name}</span></div>
                    <div className="row"><b>From:</b> <span>{data.from_}</span></div>
                    <div className="row"><b>To:</b> <span>{data.to_}</span></div>
                    <div className="row"><b>Total:</b> <span>{data.total} km</span></div>
                    <div className="row"><b>Remaining:</b> <span>{data.statuses[lastStatusIndex].remaining} km</span></div>
                    <div className="row"><b>ETA:</b> <span>{data.statuses[lastStatusIndex].eta}</span></div>
                    <div className="row"><b>Added by:</b> <span>{data.addedby}</span></div>
                    <div className="row"><b>Added:</b> <span>{data.added}</span></div>
                    <div className="row"><b>Last modified:</b> <span>{data.lastmodified}</span></div>
                    <div className="row"><b>Modified by:</b> <span>{data.modifiedby}</span></div>
                </div>

                <div className="section map-container">
                    <div className="title">Current location</div>
                    <div className="map"> HERE WILL BE THE MAP ITSELF</div>

                </div>
                
                {renderCargo()}
                {renderDrivers()}
                {renderStatuses()}
                
                
            </div>: <div className="transport-window"></div>)
        }

        return <EditTransportForm/>
    }

    return( renderTransportWindow())
}

    

export default TransportWindow