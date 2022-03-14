import { FC, useState } from "react"
import { ICargoData } from "../../interfaces"
import Button from "../button/button"
import Input from "../input/input"
import "./new-cargo-window.scss"


const NewCargoWindow:FC = ():JSX.Element =>{
    const defaultState:ICargoData = {
        name: "",
        quantity: 0,
        quantityUnit: "",
        weight: 0,
        weightUnit: "",
        info: ""
    } 

    const [state, setState] = useState<ICargoData>(defaultState)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        console.log(state)
    }

    return(
        <div className="new-cargo-window">
            <div className="new-cargo-window-form">
                <Input type="text" name="name" onChange={onChange} labelText="Name" length="long"/>
                <div className="input-group">
                    <Input type="number" name="weight" onChange={onChange} labelText="Weigth" length="short"/>
                    <Input type="text" name="weightUnit" onChange={onChange} labelText="Unit" length="short"/>

                </div>
                <div className="input-group">
                    <Input type="number" name="quantity" onChange={onChange} labelText="Quantity" length="short"/>
                    <Input type="text" name="quantityUnit" onChange={onChange} labelText="Unit" length="short"/>
                </div>

                <Input type="text" name="info" labelText="Additional info" length="long" onChange={onChange}/>
                <div className="button-div">
                    <Button text="Add Cargo" onClick={submit} />
                </div>
                
            </div>

            
        </div>
    )
}

export default NewCargoWindow