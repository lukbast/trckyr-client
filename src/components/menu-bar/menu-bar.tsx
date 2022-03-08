import { FC } from "react"
import { User } from "../../App"
import { useWindowState } from "../../context/window-context"
import MenuBarButton from "../menu-bar-button/menu-bar-button"
import "./menu-bar.scss"

interface IProps{
    user: User,
    logOut: any
}

const MenuBar:FC<IProps> = ({user, logOut}):JSX.Element =>{

    const {state, dispatch} = useWindowState()


    return(
        <div className="menu-bar">
            <div className="bar-button-container">
                <MenuBarButton text="New transport" onClick={() =>{dispatch("openNewTransport")}}/>
                <MenuBarButton text="New driver" onClick={() =>{dispatch("openNewDriver")}}/>
                <MenuBarButton text="New cargo" onClick={() =>{dispatch("openNewCargo")}}/>
            </div>
            <div className="bar-logout-container">
                <div>{`Logged as : ${user.username}`}</div>
                <div onClick={logOut} >Log out</div>
            </div>
        </div>
    )
} 


export default MenuBar