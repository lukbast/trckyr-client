import { ActionTypes as WindowActions, useCargoWindowContext } from "../../context/cargo-window-context"
import { useDataContext } from "../../context/data-context"
import Button from "../button/button"
import "./cargo-preview.scss"


const CargoPreview = ():JSX.Element => {
    
    const windowContext = useCargoWindowContext()
    const dataContext = useDataContext()
    const renderCargoDetails = ():JSX.Element =>{
        const i = windowContext.state.selected
        const data = dataContext.state.cargo[i]
        return(
            <div className="section details">
                <div className="row"><b>ID:</b> {data._id} </div>
                <div className="row"><b>Name:</b> {data.name} </div>
                <div className="row"><b>Quantity:</b> {data.quantity} {data.quantityunit}</div>
                <div className="row"><b>Weight:</b> {data.weight} {data.weightunit} </div>
                {data.info? <div className="row"><b>Additional info:</b> {data.info} </div> : ""}
                <div className="row"><b>Added by</b> {data.addedby} </div>
                <div className="row"><b>Added</b> {data.added} </div>
                <div className="row"><b>Last modified:</b> {data.lastmodified} </div>
                <div className="row"><b>Last modified:</b> {data.modifiedby} </div>
            </div>
        )
    }

    const deleteItem = () =>{
        alert("IMPLEMENT THIS!!!")
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