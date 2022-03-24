import { ActionTypes as DataActions, useCargoDataContext } from "../../context/cargo-data-context"
import { ActionTypes as WindowActions, useCargoWindowContext } from "../../context/cargo-window-context"
import Button from "../button/button"
import "./cargo-preview.scss"


const CargoPreview = ():JSX.Element => {

    const windowContext = useCargoWindowContext()
    const dataContext = useCargoDataContext()

    const renderCargoDetails = ():JSX.Element =>{
        const i = windowContext.state.selected
        const data = dataContext.state.data[i]
        return(
            <div className="section details">
                <div className="row">ID: {data._id} </div>
                <div className="row">Name: {data.name} </div>
                <div className="row">Quantity: {data.quantity} {data.quantityUnit}</div>
                <div className="row">Weight: {data.weight} {data.weightUnit} </div>
                {data.info? <div className="row">Additional info: {data.info} </div> : ""}
                <div className="row">Added by: {data.addedBy} </div>
                <div className="row">Added: {data.added} </div>
                <div className="row">Last modified: {data.lastModified} </div>
            </div>
        )
    }

    const deleteItem = () =>{
        const selected = windowContext.state.selected
        windowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: 0})
        dataContext.dispatch({type: DataActions.DELETE_CARGO, payload: dataContext.state.data[selected]})
    }

    return(
        <div className="cargo-preview">
            <div className="section buttons-section">
                <Button text="Edit cargo" onClick={() => {windowContext.dispatch(
                    {type: WindowActions.SHOW_EDIT, 
                    payload: windowContext.state.selected})}}
                />
                <Button text="New cargo" onClick={() => {windowContext.dispatch(
                    {type: WindowActions.SHOW_NEW, 
                    payload: windowContext.state.selected})}}
                />
                <Button text="Delete cargo" onClick={deleteItem}
                />
            </div>
            {renderCargoDetails()}
        </div>
    )
}



export default CargoPreview