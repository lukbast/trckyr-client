import { FC, useState } from "react"
import { useDataContext } from "../../context/data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"
import { useWindowState } from "../../context/window-context"
import { ITransportFormState } from "../../interfaces"
import TransportForm from "../transport-form/transport-form"

const EditTransportForm:FC = ():JSX.Element =>{

    const dataContext = useDataContext()
    const selectedTransportContext = useSelectedTransport()
    const windowContext = useWindowState()

    let toEdit = dataContext.state.transport[selectedTransportContext.state.index]

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
        alert("IMPLEMENT EDIT TRANSPORT")
    }

    return (<TransportForm buttonText="Edit transport" data={state} onChange={onChange} submitFunction={submit} handleSelectChange={handleSelectChange}/>)
}

export default EditTransportForm