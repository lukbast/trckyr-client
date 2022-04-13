import { FC, useEffect, useState } from "react"
import CargoForm from "../cargo-form/cargo-form"
import { ActionTypes as WindowActions, useCargoWindowContext } from "../../context/cargo-window-context"
import { FetchState, ICargoData, ICargoForm } from "../../interfaces"
import { useEditCargo } from "../../requests/fetch-cargo/edit-cargo"
import { ActionTypes, useDataContext } from "../../context/data-context"


const EditCargoForm:FC = ():JSX.Element => {

    const dataContext = useDataContext()
    const windowContext = useCargoWindowContext()
    const [newData, fetchState, editCargo, error] = useEditCargo()

    const [state, setState] = useState<ICargoData>(dataContext.state.cargo
        .filter((entry) =>{return entry._id === windowContext.state.selected})[0])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    useEffect(()=> {
        if (newData.length != 0 && fetchState === FetchState.SUCCESS){
            dataContext.dispatch({type: ActionTypes.FETCH_CARGOS, payload:{transport: [], drivers: [], cargo:newData}})
            windowContext.dispatch({type: WindowActions.SHOW_SELECTED, payload: state._id})
        }
    },[newData.length, fetchState])

    const submit = () =>{
        editCargo(state, state._id)
    }

    return(
        <CargoForm buttonText="Edit cargo" onChange={onChange} submitFunction={submit} data={state}/>
    )
}


export default EditCargoForm