import { FC, useState } from "react"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { ActionTypes, useTransportDataContext } from "../../context/transport-data-context"
import { useWindowState } from "../../context/window-context"
import TransportForm from "../transport-form/transport-form"

const NewTransportForm:FC = ():JSX.Element =>{

    const transportDataContext = useTransportDataContext()
    const selectedTransportContext = useSelectedTransport()
    const windowContex = useWindowState()

    const defaultState = {
        _id: transportDataContext.state.length, 
        name: "",
        from: "",
        to: "",
        drivers:[0],
        cargo: 0,
        total:123, 
        remaining:123, 
        eta:"123 hr 45 min", 
        state: "In progress", 
        coordinates: [123, 456]
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
        transportDataContext.dispatch({type: ActionTypes.ADD_TRANSPORT, payload:state})
        selectedTransportContext.dispatch(transportDataContext.state.length)
        windowContex.dispatch("openTransport")
    }

    return (<TransportForm buttonText="Add transport" data={state} onChange={onChange} submitFunction={submit} handleSelectChange={handleSelectChange}/>)
}

export default NewTransportForm