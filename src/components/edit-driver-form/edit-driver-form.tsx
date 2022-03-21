import { FC, useState } from "react"
import { ActionTypes as DataActions, useDriverDataContext } from "../../context/driver-data-context"
import {ActionTypes as WindowActions, useDriversWindowContext } from "../../context/drivers-window-context"
import { IDriverData } from "../../interfaces"
import DriverForm from "../driver-form/driver-form"

const EditDriverForm:FC = ():JSX.Element =>{
    const driverDataContext = useDriverDataContext()
    const windowContext = useDriversWindowContext()

    const [state, setState] = useState<IDriverData>(driverDataContext.state[windowContext.state.selected])
    

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        driverDataContext.dispatch({type: DataActions.EDIT_DRIVER, payload:state})
        windowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: state._id})
    }


    return(<DriverForm onChange={onChange} submitFunction={submit} buttonText="Edit driver" data={state} />)

}

export default EditDriverForm