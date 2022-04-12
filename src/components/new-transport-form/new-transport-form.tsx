import { FC, useState } from "react"
import { useDataContext } from "../../context/data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { useWindowState } from "../../context/window-context"
import { ITransportData } from "../../interfaces"
import TransportForm from "../transport-form/transport-form"

const NewTransportForm:FC = ():JSX.Element =>{

    const selectedTransportContext = useSelectedTransport()
    const windowContex = useWindowState()

    const dataContext = useDataContext()

    const defaultState:ITransportData = {
        _id: dataContext.state.transport.length, 
        name: "",
        from_: "",
        to_: "",
        drivers:[0],
        cargo: 0,
        total:123, 
        state: "In progress", 
        addedby: "TEST ACCOUNT",
        added: "23/05/2021",
        lastmodified: "30/02/2022",
        modifiedby: "30/02/2022",
        statuses: []
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
        alert("IMPLEMENT NEW TRANSPORT")
    }

    return (<TransportForm buttonText="Add transport" data={state} onChange={onChange} submitFunction={submit} handleSelectChange={handleSelectChange}/>)
}

export default NewTransportForm