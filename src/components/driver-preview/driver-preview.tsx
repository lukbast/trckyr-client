import { FC } from "react"
import {ActionTypes as DataActions,  useDriverDataContext } from "../../context/driver-data-context"
import { ActionTypes as WindowActions, useDriversWindowContext } from "../../context/drivers-window-context"
import Button from "../button/button"
import "./driver-preview.scss"


const DriverPreview:FC = ():JSX.Element =>{

    const windowContext = useDriversWindowContext()
    const dataContext = useDriverDataContext()

    const renderDriverDetails = ():JSX.Element =>{
        const i = windowContext.state.selected
        const data = dataContext.state[i]

        return (
            <div className="section details">
                <div className="row"><b>ID:</b> {data._id} </div>
                <div className="row"><b>First name:</b> {data.firstName} </div>
                <div className="row"><b>Last name:</b> {data.lastName} </div>
                <div className="row"><b>Added by:</b>  {data.addedBy} </div>
                <div className="row"><b>Added</b> {data.added} </div>
                <div className="row"><b>Last modified:</b> {data.lastModified} </div>
            </div>
    )}

    const deleteItem = () =>{
        const selected = windowContext.state.selected
        windowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: 0})
        dataContext.dispatch({type: DataActions.DELETE_DRIVER, payload: dataContext.state[selected]})
    }

    return (
        <div className="driver-preview">
            <div className="section buttons-section">
                <Button onClick={() => {windowContext.dispatch({type: WindowActions.SHOW_NEW, payload: windowContext.state.selected})}} text="New driver"/>
                <Button onClick={() => {windowContext.dispatch({type: WindowActions.SHOW_EDIT, payload: windowContext.state.selected})}} text="Edit driver"/>
                <Button onClick={deleteItem} text="delete driver"/>
            </div>
            {renderDriverDetails()}
        </div>
    )
}

export default DriverPreview