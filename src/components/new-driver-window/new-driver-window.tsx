import { FC, useState } from "react"
import { IDriverData } from "../../interfaces"
import Button from "../button/button"
import Input from "../input/input"
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
            <div className="new-driver-window-form">
                <Input name="name" type="text" labelText="Name" length="long" onChange={onChange} />
                <Input name="phone" type="text" labelText="Phone" length="long" onChange={onChange} />
                <Input name="email" type="text" labelText="email" length="long" onChange={onChange} />
                <div className="button-div">
                    <Button text="Add driver" onClick={submit} />
                </div>
            </div>
            
        </div>
    )
}


export default NewDriverWindow