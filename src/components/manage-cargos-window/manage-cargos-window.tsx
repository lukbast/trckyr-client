import { FC } from "react"
import CargoList from "../cargo-list/cargo-list"
import NewCargoForm from "../new-cargo-form/new-cargo-form"
import { useCargoWindowContext } from "../../context/cargo-window-context"
import Subwindow from "../subwindow/subwindow"
import "./manage-cargos-window.scss"
import CargoPreview from "../cargo-preview/cargo-preview"
import EditCargoForm from "../edit-cargo-form/edit-cargo-form"


const NewCargoWindow:FC = ():JSX.Element =>{

    const cargoWindowContext = useCargoWindowContext()

    const renderContentOfSubwindow = ():JSX.Element =>{
        const state = cargoWindowContext.state
        if (state.showSelected){
            return <CargoPreview/>
        } 
        if (state.showNew){
            return <NewCargoForm/>
        }
        return <EditCargoForm/>
    }

    return(
        <div className="manage-cargo-window">
            <CargoList/>
            <Subwindow>
                {renderContentOfSubwindow()}
            </Subwindow>
            
        </div>
    )
}

export default NewCargoWindow