import { FC } from "react"
import { useWindowState } from "../../context/window-context"
import "./main-tab.scss"

const MainTab:FC = ():JSX.Element =>{

    const {state, dispatch} = useWindowState()


    const display = ():JSX.Element =>{
        if (state.newTransportWindow) {
            return <div style={{color: "white"}}>NEW TRANSPORT WINDOW OPENED</div>
        } else if (state.newDriverWindow) {
            return <div style={{color: "white"}}>NEW DRIVER WINDOW OPENED</div>
        } else if (state.newCargo) {
            return <div style={{color: "white"}}>NEW CARGO WINDOW OPENED</div>
        }
        return <div style={{color: "white"}}>TRANSPORT WINDOW OPENED</div>
    }

    return(
        <div className="main-tab">
            {display()}
        </div>
    )
}


export default MainTab