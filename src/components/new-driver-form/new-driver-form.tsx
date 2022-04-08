import { FC, useEffect, useState } from "react"
import { ActionTypes, useDriverDataContext } from "../../context/driver-data-context"
import { FetchState, IDriverData, IDriverForm } from "../../interfaces"
import { useNewDriver } from "../../requests/fetch-drivers/new-driver"
import DriverForm from "../driver-form/driver-form"

const NewDriverForm:FC = ():JSX.Element =>{
    const driverDataContext = useDriverDataContext()
    const [newData, fetchState, newDriver] = useNewDriver()
    const defaultState:IDriverForm = {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
    }

    const [state, setState] = useState<IDriverForm>(defaultState)
    
    useEffect(()=>{
        if (newData.length > 0 && fetchState === FetchState.SUCCESS){
            driverDataContext.dispatch({type: ActionTypes.FETCH_DATA, payload:newData[0], tempPayload:newData} )
        }

    },[newData, fetchState])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        newDriver(state)
    }


    return(<DriverForm onChange={onChange} submitFunction={submit} buttonText="Add driver" data={state as IDriverData} />)

}

export default NewDriverForm