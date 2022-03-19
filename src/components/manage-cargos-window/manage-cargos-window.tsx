import { FC } from "react"
import { useCargoDataContext } from "../../context/cargo-data-context"
import CargoList from "../cargo-list/cargo-list"
import NewCargoForm from "../new-cargo-form/new-cargo-form"
import Subwindow from "../subwindow/subwindow"
import "./manage-cargos-window.scss"




const NewCargoWindow:FC = ():JSX.Element =>{

    const cargoDataContext = useCargoDataContext()


    return(
        <div className="manage-cargo-window">
            <CargoList data={cargoDataContext.state.data}/>
            <Subwindow>
                <NewCargoForm/>
            </Subwindow>
            
        </div>
    )
}

export default NewCargoWindow