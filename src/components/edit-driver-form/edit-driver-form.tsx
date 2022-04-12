import { FC, useEffect, useState } from "react"
import { ActionTypes as DataActions, useDriverDataContext } from "../../context/driver-data-context"
import {ActionTypes as WindowActions, useDriversWindowContext } from "../../context/drivers-window-context"
import { FetchState, IDriverData, IDriverForm } from "../../interfaces"
import { useEditDriver } from "../../requests/fetch-drivers/edit-drivers"
import DriverForm from "../driver-form/driver-form"

const EditDriverForm:FC = ():JSX.Element =>{
    const driverDataContext = useDriverDataContext()
    const windowContext = useDriversWindowContext()

    const [state, setState] = useState<IDriverData>(driverDataContext.state[windowContext.state.selected])
    
    const [newDrivers, fetchState, editDriver] = useEditDriver()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    useEffect(() =>{
        if (newDrivers.length != 0 && fetchState == FetchState.SUCCESS){
            driverDataContext.dispatch({type: DataActions.FETCH_DATA, payload:state, tempPayload: newDrivers})
            windowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: state._id})
        }
    }, [newDrivers.length])

    const submit = () =>{
        editDriver((state as unknown) as IDriverForm,state._id )
        
    }


    return(<DriverForm onChange={onChange} submitFunction={submit} buttonText="Edit driver" data={state} />)

}

export default EditDriverForm