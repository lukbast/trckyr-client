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

export let exampleState = {
    name: "Chocholate bars for babushka",
    from: "UK, London",
    to: "Poland, Warsaw",
    drivers: ["Grzegorz Brzęszyczykiewicz", "Kargul"],
    cargo: "Chocolate bars",
    quantity: "10000000",
    total: 1234,
    remaining: 86,
    eta: "2 hr 32 min",
    state: "In progress",
    coordinates: [52.254717669337616, 21.015183348860532]
}

const MainWindow:FC<IProps> = ({user, logOut}):JSX.Element =>{

    return(
        <div className="main-window">
            <MenuBar user={user} logOut={logOut}/>
            <ListOfActive data={exampleState}/>
            <MainTab/>
            
        </div>
    )
}


export default MainWindow