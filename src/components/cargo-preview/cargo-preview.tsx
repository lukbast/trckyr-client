import { useCargoDataContext } from "../../context/cargo-data-context"
import { ActionTypes, useCargoWindowContext } from "../../context/cargo-window-context"
import Button from "../button/button"
import "./cargo-preview.scss"



const CargoPreview = ():JSX.Element => {

    const cargoWindowContext = useCargoWindowContext()
    const cargoDataContest = useCargoDataContext()

    const onClick = () =>{
        alert("IM WORKING !!11!!1!!!!1111")
    }

    const renderCargoDetails = ():JSX.Element    =>{
        const i = cargoWindowContext.state.selected
        const data = cargoDataContest.state.data[i]
        return(
            <div className="cargo-details">
                {[data._id, data.name, data.weight, data.quantity, data.quantityUnit, data.weight, data.weightUnit, data.info]}
            </div>
        )
    }

    return(
        <div className="cargo-preview">
            <Button text="Edit cargo" onClick={() => {cargoWindowContext.dispatch(
                {type: ActionTypes.SHOW_EDIT, 
                 payload: cargoWindowContext.state.selected})}}
            />
            <Button text="New cargo" onClick={() => {cargoWindowContext.dispatch(
                {type: ActionTypes.SHOW_NEW, 
                 payload: cargoWindowContext.state.selected})}}/>
            {renderCargoDetails()}
        </div>
    )
}



export default CargoPreview