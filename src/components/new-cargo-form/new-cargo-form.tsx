import { FC, useState } from "react"
import { ActionTypes, useCargoDataContext } from "../../context/cargo-data-context"
import { ICargoData } from "../../interfaces"
import Button from "../button/button"
import Input from "../input/input"
import "./new-cargo-form.scss"


const NewCargoForm:FC = ():JSX.Element =>{
    const cargoContext  = useCargoDataContext()

    const defaultState:ICargoData = {
        _id: cargoContext.state.data.length,
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
        cargoContext.dispatch({type: ActionTypes.ADD_CARGO, payload:state})
        setState({...state,
        _id: state._id + 1})
    }

    return(
        <div className="new-cargo-form">
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

    )
}

export default NewCargoForm