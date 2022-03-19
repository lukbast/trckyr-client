import { FC, useState } from "react"
import { IDriverData } from "../../interfaces"
import DriverForm from "../driver-form/driver-form"
import "./new-driver-window.scss"



const NewDriverWindow:FC = ():JSX.Element =>{

    const defaultState:IDriverData = {
        name: "",
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


    return(
        <div className="new-driver-window">
            <DriverForm onChange={onChange} submitFunction={submit} buttonText="Dew driver" />
            
        </div>
    )
}


export default NewDriverWindow