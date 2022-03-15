import { FC } from "react"
import NewCargoForm from "../new-cargo-form/new-cargo-form"
import "./manage-cargos-window.scss"


const NewCargoWindow:FC = ():JSX.Element =>{


    return(
        <div className="manage-cargo-window">
            <div className="manage-cargo-window-list">

            </div>
            <NewCargoForm/>
            
        </div>
    )
}

export default NewCargoWindow