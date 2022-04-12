import { FC, useEffect, useState } from "react"
import { ActionTypes, useDataContext } from "../../context/data-context"
import { FetchState, ICargoForm } from "../../interfaces"
import { useNewCargo } from "../../requests/fetch-cargo/new-cargo"
import CargoForm from "../cargo-form/cargo-form"


const NewCargoForm:FC = ():JSX.Element =>{
    const dataContext = useDataContext()
    const [newData, fetchState, newCargo, errror]  = useNewCargo()

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
        if (newData.length > 0 && fetchState === FetchState.SUCCESS){
            dataContext.dispatch({type:ActionTypes.FETCH_CARGOS, payload:{transport:[], drivers: [], cargo: newData}})
        }
    }, [newData, fetchState])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(e.target.value)
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        newCargo(state)
    }

    return(
        <CargoForm buttonText="New Cargo" submitFunction={submit} onChange={onChange} data={state} />

    )
}

export default NewCargoForm