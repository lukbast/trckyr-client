import { FC } from "react"
import { useWindowState } from "../../context/window-context"
import TransportWindow from "../transport-window/transport-window"
import { ITransportData } from "./interfaces"
import "./main-tab.scss"

interface IProps {
    transportData: ITransportData
}

const MainTab:FC<IProps> = ({transportData}):JSX.Element =>{

    const {state, dispatch} = useWindowState()


    const display = ():JSX.Element =>{
        if (state.newTransportWindow) {
            return <div style={{color: "white"}}>NEW TRANSPORT WINDOW OPENED</div>
        } else if (state.newDriverWindow) {
            return <div style={{color: "white"}}>NEW DRIVER WINDOW OPENED</div>
        } else if (state.newCargo) {
            return <div style={{color: "white"}}>NEW CARGO WINDOW OPENED</div>
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