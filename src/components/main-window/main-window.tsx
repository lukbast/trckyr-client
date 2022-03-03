import { FC } from "react"
import ListOfActive from "../list-of-active/list-of-active"
import MainTab from "../main-tab/main-tab"
import MenuBar from "../menu-bar/menu-bar"
import "./main-window.scss"


const MainWindow:FC = ():JSX.Element =>{
    return(
        <div className="main-window">
            <MenuBar/>
            <ListOfActive/>
            <MainTab/>
            
        </div>
    )
}


export default MainWindow