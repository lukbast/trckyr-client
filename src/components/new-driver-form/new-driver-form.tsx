import { FC, useState } from "react"
import { IDriverData } from "../../interfaces"
import DriverForm from "../driver-form/driver-form"

const NewDriverForm:FC = ():JSX.Element =>{

    const defaultState:IDriverData = {
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
        console.log(state)
    }


    return(<DriverForm onChange={onChange} submitFunction={submit} buttonText="Add driver" />)

}

export default NewDriverForm