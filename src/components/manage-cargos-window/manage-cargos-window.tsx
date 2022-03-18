import { FC } from "react"
import { useCargoContext } from "../../context/cargo-context"
import CargoList from "../cargo-list/cargo-list"
import NewCargoForm from "../new-cargo-form/new-cargo-form"
import Subwindow from "../subwindow/subwindow"
import "./manage-cargos-window.scss"




const NewCargoWindow:FC = ():JSX.Element =>{

    const {state, dispatch} = useCargoContext()


    return(
        <div className="manage-cargo-window">
            <CargoList data={state.data}/>
            <Subwindow>
                <NewCargoForm/>
            </Subwindow>
            
        </div>
    )
}

export default NewCargoWindow