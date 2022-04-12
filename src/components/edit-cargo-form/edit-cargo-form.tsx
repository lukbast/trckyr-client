import { FC, useEffect, useState } from "react"
import CargoForm from "../cargo-form/cargo-form"
import { useCargoDataContext, ActionTypes as DataActions } from "../../context/cargo-data-context"
import { ActionTypes as WindowActions, useCargoWindowContext } from "../../context/cargo-window-context"
import { FetchState, ICargoForm } from "../../interfaces"
import { useEditCargo } from "../../requests/fetch-cargo/edit-cargo"


const EditCargoForm:FC = ():JSX.Element => {


    const cargoDataContext  = useCargoDataContext()
    const cargoWindowContext = useCargoWindowContext()
    const [newData, fetchState, editCargo, error] = useEditCargo()

    const [state, setState] = useState(cargoDataContext.state[cargoWindowContext.state.selected])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    useEffect(()=> {
        if (newData.length != 0 && fetchState === FetchState.SUCCESS){
            cargoDataContext.dispatch({type: DataActions.FETCH_DATA, payload: state, tempPayload:newData})
            cargoWindowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: state._id})
        }
    },[newData.length])

    const submit = () =>{
        editCargo((state as unknown) as ICargoForm, state._id)
    }

    return(
        <CargoForm buttonText="Edit cargo" onChange={onChange} submitFunction={submit} data={(state as unknown) as ICargoForm}/>
    )
}


export default EditCargoForm