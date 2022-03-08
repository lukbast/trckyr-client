import { FC } from "react"
import { useSelectedTransport } from "../../context/selected-transport-context"
import ListOfActive from "../list-of-active/list-of-active"
import MainTab from "../main-tab/main-tab"
import MenuBar from "../menu-bar/menu-bar"
import "./main-window.scss"
import { exampleState } from "./tempState"

interface IProps{
    user: {
        username: string
    }
    logOut: any
}

const MainWindow:FC<IProps> = ({user, logOut}):JSX.Element =>{

    const selectedTransport = useSelectedTransport()

    return(
        <div className="main-window">
            <MenuBar user={user} logOut={logOut}/>
            <ListOfActive data={exampleState}/>
            <MainTab transportData={exampleState[selectedTransport.state.index]}/>
        </div>
    )
}


export default MainWindow