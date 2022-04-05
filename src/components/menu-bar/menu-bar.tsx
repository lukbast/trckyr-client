import { FC } from "react"
import { User } from "../../App"
import { useWindowState } from "../../context/window-context"
import MenuBarButton from "../menu-bar-button/menu-bar-button"
import "./menu-bar.scss"


import driverIcon from "../../assets/driver.svg"
import cargoIcon from "../../assets/cargo.svg"
import transportIcon from "../../assets/transport.svg"

interface IProps{
    user: User,
    logOut: any
}

const MenuBar:FC<IProps> = ({user, logOut}):JSX.Element =>{


    const {state, dispatch} = useWindowState()

    const getSelected = (name: string) =>{
        const sel = state.selectedButton
        return sel ===  name ? true: false
    }



    return(
        <div className="menu-bar">
            <div className="bar-button-container">
                <MenuBarButton selected={getSelected("transport")} icon={transportIcon} text="New transport" onClick={() =>{dispatch("openNewTransport")}}/>
                <MenuBarButton selected={getSelected("driver")} icon={driverIcon} text="Manage drivers" onClick={() =>{dispatch("openManageDrivers")}}/>
                <MenuBarButton selected={getSelected("cargo")} icon={cargoIcon} text="Manage cargos" onClick={() =>{dispatch("openManageCargos")}}/>
            </div>
            <div className="bar-logout-container">
                <div>{`Logged as : ${user.username}`}</div>
                <div onClick={logOut} >Log out</div>
            </div>
        </div>
    )
} 


export default MenuBar