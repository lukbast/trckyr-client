import { FC, useState } from "react"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { ActionTypes, useTransportDataContext } from "../../context/transport-data-context"
import { useWindowState } from "../../context/window-context"
import { ITransportFormState } from "../../interfaces"
import TransportForm from "../transport-form/transport-form"

const EditTransportForm:FC = ():JSX.Element =>{

    const transportDataContext = useTransportDataContext()
    const selectedTransportContext = useSelectedTransport()
    const windowContext = useWindowState()

    let toEdit = transportDataContext.state[selectedTransportContext.state.index]

    const defaultState:ITransportFormState = {name:toEdit.name, 
        to_: toEdit.to_, 
        from_:toEdit.from_, 
        drivers: toEdit.drivers, 
        cargo: toEdit.cargo
    } 
    const [state, setState] =  useState(defaultState)

     function handleSelectChange(e:React.ChangeEvent<HTMLSelectElement>) {
        const options = e.target.options;
        const value = [];
        const name = e.target.name
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(parseInt(options[i].value));
          }
        }
        
        setState({...state,
            [name]:value})
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>){
        const name = e.target.name
        let value: string | number = e.target.value
        if (name === "cargo"){ 
            value = parseInt(value)
        }
        setState({...state,
            [name]: value 
        })
    }

    const submit = ()=>{
        toEdit = {...toEdit, ...state}
        transportDataContext.dispatch({type: ActionTypes.EDIT_TRANSPORT, payload:toEdit})
        windowContext.dispatch("openTransport")
    }

    return (<TransportForm buttonText="Edit transport" data={state} onChange={onChange} submitFunction={submit} handleSelectChange={handleSelectChange}/>)
}

export default EditTransportForm