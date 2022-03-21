import { FC, useState } from "react"
import { ActionTypes, useCargoDataContext } from "../../context/cargo-data-context"
import { ICargoData } from "../../interfaces"
import CargoForm from "../cargo-form/cargo-form"


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
        <CargoForm buttonText="New Cargo" submitFunction={submit} onChange={onChange} data={state} />

    )
}

export default NewCargoForm