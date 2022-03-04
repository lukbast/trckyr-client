import { FC } from "react"
import { User } from "../../App"
import MenuBarButton from "../menu-bar-button/menu-bar-button"
import "./menu-bar.scss"

interface IProps{
    user: User,
    logOut: any
}

const MenuBar:FC<IProps> = ({user, logOut}):JSX.Element =>{

    const sampleClickListener = () =>{
        alert("I AM WORKING")
    }

    return(
        <div className="menu-bar">
            <div className="bar-button-container">
                <MenuBarButton text="New transport" onClick={sampleClickListener}/>
                <MenuBarButton text="New driver" onClick={sampleClickListener}/>
                <MenuBarButton text="New cargo" onClick={sampleClickListener}/>
            </div>
            <div className="bar-logout-container">
                <div>{`Logged as : ${user.username}`}</div>
                <div onClick={logOut} >Log out</div>
            </div>
        </div>
    )
} 


export default MenuBar