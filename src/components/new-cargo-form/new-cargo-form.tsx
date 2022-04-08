import { FC, useEffect, useState } from "react"
import { ActionTypes, useCargoDataContext } from "../../context/cargo-data-context"
import { FetchState, ICargoData, ICargoForm } from "../../interfaces"
import { useNewCargo } from "../../requests/fetch-cargo/new-cargo"
import CargoForm from "../cargo-form/cargo-form"


const NewCargoForm:FC = ():JSX.Element =>{
    const cargoContext  = useCargoDataContext()
    const [data, fetchState, getNewCargo, errror]  = useNewCargo()

    const defaultState:ICargoForm = {
        name: "",
        quantity: "",
        quantityunit: "",
        weight: "",
        weightunit: "",
        info: "",

    } 

    const [state, setState] = useState<ICargoForm>(defaultState)

    useEffect(() =>{
        console.log("IM CALLED")
        if (data.length > 0 && fetchState === FetchState.SUCCESS){
            console.log(data)
            cargoContext.dispatch({type:ActionTypes.FETCH_DATA, payload:data[0], tempPayload: data})
        }
    }, [data])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        getNewCargo(state)
    }

    return(
        <CargoForm buttonText="New Cargo" submitFunction={submit} onChange={onChange} data={state} />

    )
}

export default NewCargoForm