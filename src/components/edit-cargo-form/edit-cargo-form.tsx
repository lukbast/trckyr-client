import { FC, useState } from "react"
import CargoForm from "../cargo-form/cargo-form"
import { useCargoDataContext } from "../../context/cargo-data-context"
import { useCargoWindowContext } from "../../context/cargo-window-context"


const EditCargoForm:FC = ():JSX.Element => {


    const cargoDataContext  = useCargoDataContext()
    const cargoWindowContext = useCargoWindowContext()

    const [state, setState] = useState(cargoDataContext.state.data[cargoWindowContext.state.selected])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value 
        })
    }

    const submit = () =>{
        console.log(state)
    }

    return(
        <CargoForm buttonText="Edit cargo" onChange={onChange} submitFunction={submit} data={state}/>
    )
}


export default EditCargoForm