import { FC, useState } from "react"
import CargoForm from "../cargo-form/cargo-form"
import { useCargoDataContext, ActionTypes as DataActions } from "../../context/cargo-data-context"
import { ActionTypes as WindowActions, useCargoWindowContext } from "../../context/cargo-window-context"
import { ICargoForm } from "../../interfaces"


const EditCargoForm:FC = ():JSX.Element => {


    const cargoDataContext  = useCargoDataContext()
    const cargoWindowContext = useCargoWindowContext()

    const [state, setState] = useState(cargoDataContext.state[cargoWindowContext.state.selected])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        cargoDataContext.dispatch({type: DataActions.EDIT_CARGO, payload: state})
        cargoWindowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: state._id})
    }

    return(
        <CargoForm buttonText="Edit cargo" onChange={onChange} submitFunction={submit} data={(state as unknown) as ICargoForm}/>
    )
}


export default EditCargoForm