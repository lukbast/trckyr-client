import { FC } from "react"
import { useWindowState } from "../../context/window-context"
import NewCargoWindow from "../new-cargo-window/new-cargo-window"
import TransportWindow from "../transport-window/transport-window"
import { ITransportData } from "../../interfaces"
import "./main-tab.scss"
import NewDriverWindow from "../new-driver-window/new-driver-window"

interface IProps {
    transportData: ITransportData
}

const MainTab:FC<IProps> = ({transportData}):JSX.Element =>{

    const {state, dispatch} = useWindowState()


    const display = ():JSX.Element =>{
        if (state.newTransportWindow) {
            return <div style={{color: "white"}}>NEW TRANSPORT WINDOW OPENED</div>
        } else if (state.newDriverWindow) {
            return <NewDriverWindow/>
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