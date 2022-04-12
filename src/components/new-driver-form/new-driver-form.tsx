import { FC, useEffect, useState } from "react"
import { ActionTypes, useDataContext } from "../../context/data-context"
import { FetchState, IDriverData, IDriverForm } from "../../interfaces"
import { useNewDriver } from "../../requests/fetch-drivers/new-driver"
import DriverForm from "../driver-form/driver-form"

const NewDriverForm:FC = ():JSX.Element =>{
    const dataContext = useDataContext()
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
            dataContext.dispatch({type: ActionTypes.FETCH_DRIVERS, payload:{transport: [], cargo: [], drivers:newData}} )
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