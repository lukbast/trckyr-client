import { FC } from "react"
import MenuBarButton from "../menu-bar-button/menu-bar-button"
import "./menu-bar.scss"

const MenuBar:FC = ():JSX.Element =>{

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
                <div>{"Logged as : <<-- USERNAME HERE -->>"}</div>
                <div>Log out</div>
            </div>
        </div>
    )
} 


export default MenuBar