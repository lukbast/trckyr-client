import { FC, useEffect, useState } from "react"
import { ActionTypes, useDataContext } from "../../context/data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { useWindowState } from "../../context/window-context"
import { FetchState, ITransportForm } from "../../interfaces"
import { useNewTransport } from "../../requests/fetch-transports/new-transport"
import TransportForm from "../transport-form/transport-form"

const NewTransportForm:FC = ():JSX.Element =>{

    const selectedTransportContext = useSelectedTransport()
    const windowContex = useWindowState()
    const dataContext = useDataContext()
    const [newTransports, fetchState, newTransport] = useNewTransport()

    const defaultState:ITransportForm = {
        name: "",
        from_: "",
        to_: "",
        drivers:[],
        cargo: "",
    } 
    const [state, setState] =  useState(defaultState)

    useEffect(() => {
      if (newTransports.length > 0 && fetchState === FetchState.SUCCESS){
        dataContext.dispatch({type: ActionTypes.FETCH_TRANSPORTS, payload:{drivers: [], cargo: [], transport: newTransports}})
        
        
        setTimeout(() =>{
            selectedTransportContext.dispatch(0)
            windowContex.dispatch("openTransport")
        }, 800)
        
      }
    }, [newTransports, fetchState])
    

    function handleSelectChange(e:React.ChangeEvent<HTMLSelectElement>) {
        const options = e.target.options;
        const value = [];
        const name = e.target.name
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        
        setState({...state,
            [name]:value})
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>){
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = ()=>{
        newTransport(state)
    }

    return (<TransportForm buttonText="Add transport" data={state} onChange={onChange} submitFunction={submit} handleSelectChange={handleSelectChange}/>)
}

export default NewTransportForm