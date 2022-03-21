import { FC } from "react"
import { useWindowState } from "../../context/window-context"
import ManageCargosWindow from "../manage-cargos-window/manage-cargos-window"
import TransportWindow from "../transport-window/transport-window"
import { ITransportData } from "../../interfaces"
import "./main-tab.scss"
import ManageDriversWindow from "../manage-drivers-window/manage-driver-window"
import { DriversWindowProvider } from "../../context/drivers-window-context"
import { CargoWindowProvider } from "../../context/cargo-window-context"

interface IProps {
    transportData: ITransportData
}

const MainTab:FC<IProps> = ({transportData}):JSX.Element =>{

    const {state, dispatch} = useWindowState()


    const display = ():JSX.Element =>{
        if (state.newTransportWindow) {
            return <div>NEW TRANSPORT WINDOW OPENED</div>
        } else if (state.newDriverWindow) {
            return <DriversWindowProvider><ManageDriversWindow/></DriversWindowProvider>
        } else if (state.newCargo) {
            return <CargoWindowProvider><ManageCargosWindow/></CargoWindowProvider>
        }
        return <TransportWindow data={transportData}/>
    }

    return(
        <div className="main-tab">
            {display()}
        </div>
    )
}


export default MainTab