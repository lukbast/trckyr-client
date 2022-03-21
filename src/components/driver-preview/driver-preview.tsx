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
            <div className="drivers-details">
                {[data._id, data.email, data.firstName, data.lastName, data.phone]}
            </div>
        )

    }

    const deleteItem = () =>{
        const selected = windowContext.state.selected
        windowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: 0})
        dataContext.dispatch({type: DataActions.DELETE_DRIVER, payload: dataContext.state[selected]})
    }

    return (
        <div className="driver-preview">
            <Button onClick={() => {windowContext.dispatch({type: WindowActions.SHOW_NEW, payload: windowContext.state.selected})}} text="New driver"/>
            <Button onClick={() => {windowContext.dispatch({type: WindowActions.SHOW_EDIT, payload: windowContext.state.selected})}} text="Edit driver"/>
            <Button onClick={deleteItem} text="delete driver"/>
            {renderDriverDetails()}
        </div>
    )
}



export default DriverPreview