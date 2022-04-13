import { FC, useEffect, useState } from "react"
import { ActionTypes, useDataContext } from "../../context/data-context"
import {ActionTypes as WindowActions, useDriversWindowContext } from "../../context/drivers-window-context"
import { FetchState, IDriverData, IDriverForm } from "../../interfaces"
import { useEditDriver } from "../../requests/fetch-drivers/edit-drivers"
import DriverForm from "../driver-form/driver-form"

const EditDriverForm:FC = ():JSX.Element =>{
    const dataContext = useDataContext()
    const windowContext = useDriversWindowContext()

    const [state, setState] = useState<IDriverData>(dataContext.state.drivers.
        filter((entry) =>{ return entry._id === windowContext.state.selected})[0])
    
    const [newDrivers, fetchState, editDriver] = useEditDriver()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    useEffect(() =>{
        if (newDrivers.length != 0 && fetchState == FetchState.SUCCESS){
            dataContext.dispatch({type: ActionTypes.FETCH_DRIVERS, payload:{transport:[], cargo:[], drivers: newDrivers}})
            windowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: state._id})
        }
    }, [newDrivers.length, fetchState])

    const submit = () =>{
        editDriver((state as unknown) as IDriverForm,state._id )
        
    }


    return(<DriverForm onChange={onChange} submitFunction={submit} buttonText="Edit driver" data={state} />)

}

export default EditDriverForm