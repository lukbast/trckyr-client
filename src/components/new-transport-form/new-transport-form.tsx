import { FC, useState } from "react"
import TransportForm from "../transport-form/transport-form"

const NewTransportForm:FC = ():JSX.Element =>{
    const defaultState = {
        name: "",
        from: "",
        to: "",
        drivers:[0],
        cargo: 0
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
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = ()=>{
        console.log(state)
    }

    return (<TransportForm data={state} onChange={onChange} submitFunction={submit} handleSelectChange={handleSelectChange}/>)
}

export default NewTransportForm