import { FC } from "react"
import { useWindowState } from "../../context/window-context"
import ManageCargosWindow from "../manage-cargos-window/manage-cargos-window"
import TransportWindow from "../transport-window/transport-window"
import "./main-tab.scss"
import ManageDriversWindow from "../manage-drivers-window/manage-driver-window"
import { DriversWindowProvider } from "../../context/drivers-window-context"
import { CargoWindowProvider } from "../../context/cargo-window-context"
import { useTransportDataContext } from "../../context/transport-data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"

import NewTransportForm from "../new-transport-form/new-transport-form"


const MainTab:FC = ():JSX.Element =>{

    const {state, dispatch} = useWindowState()
    const transportDataContext = useTransportDataContext()
    const selectedTransport = useSelectedTransport()
    

    const display = ():JSX.Element =>{
        const data = transportDataContext.state[selectedTransport.state.index]
        if (state.newTransportWindow) {
            return <NewTransportForm/>
        } else if (state.newDriverWindow) {
            return <DriversWindowProvider><ManageDriversWindow/></DriversWindowProvider>
        } else if (state.newCargo) {
            return <CargoWindowProvider><ManageCargosWindow/></CargoWindowProvider>
        }
        return <TransportWindow data={data}/>
    }

    return(
        <div className="main-tab hide-srollbars">
            {display()}
        </div>
    )
}


export default MainTab