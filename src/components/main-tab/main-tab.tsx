import { FC } from "react"
import { useWindowState } from "../../context/window-context"
import NewCargoWindow from "../manage-cargos-window/manage-cargos-window"
import TransportWindow from "../transport-window/transport-window"
import { ITransportData } from "../../interfaces"
import "./main-tab.scss"
import ManageDriversWindow from "../manage-drivers-window/manage-driver-window"

interface IProps {
    transportData: ITransportData
}

const MainTab:FC<IProps> = ({transportData}):JSX.Element =>{

    const {state, dispatch} = useWindowState()


    const display = ():JSX.Element =>{
        if (state.newTransportWindow) {
            return <div>NEW TRANSPORT WINDOW OPENED</div>
        } else if (state.newDriverWindow) {
            return <ManageDriversWindow/>
        } else if (state.newCargo) {
            return <NewCargoWindow/>
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