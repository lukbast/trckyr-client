import { FC } from "react"
import ListOfActive from "../list-of-active/list-of-active"
import MainTab from "../main-tab/main-tab"
import MenuBar from "../menu-bar/menu-bar"
import "./main-window.scss"

interface IProps{
    user: {
        username: string
    }
    logOut: any
}

const MainWindow:FC<IProps> = ({user, logOut}):JSX.Element =>{

    return(
        <div className="main-window">
            <MenuBar user={user} logOut={logOut}/>
            <ListOfActive/>
            <MainTab/>
        </div>
    )
}


export default MainWindow