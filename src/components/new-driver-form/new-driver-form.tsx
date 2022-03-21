import { FC, useState } from "react"
import { ActionTypes, useDriverDataContext } from "../../context/driver-data-context"
import { IDriverData } from "../../interfaces"
import DriverForm from "../driver-form/driver-form"

const NewDriverForm:FC = ():JSX.Element =>{
    const driverDataContext = useDriverDataContext()

    const defaultState:IDriverData = {
        _id: driverDataContext.state.length,
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    }

    const [state, setState] = useState<IDriverData>(defaultState)
    

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        driverDataContext.dispatch({type: ActionTypes.ADD_DRIVER, payload:state})
        setState({...state,
        _id: state._id + 1})
    }


    return(<DriverForm onChange={onChange} submitFunction={submit} buttonText="Add driver" />)

}

export default NewDriverForm