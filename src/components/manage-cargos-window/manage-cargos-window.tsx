import { FC } from "react"
import CargoList from "../cargo-list/cargo-list"
import NewCargoForm from "../new-cargo-form/new-cargo-form"
import Subwindow from "../subwindow/subwindow"
import "./manage-cargos-window.scss"




const NewCargoWindow:FC = ():JSX.Element =>{

    return(
        <div className="manage-cargo-window">
            <CargoList/>
            <Subwindow>
                <NewCargoForm/>
            </Subwindow>
            
        </div>
    )
}

export default NewCargoWindow