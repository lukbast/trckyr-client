import { FC} from "react"
import { useCargoDataContext } from "../../context/cargo-data-context"
import { useDriverDataContext } from "../../context/driver-data-context"
import { ITransportFormState} from "../../interfaces"
import Button from "../button/button"
import Input from "../input/input"


interface IProps{
    data: ITransportFormState,
    onChange: any,
    handleSelectChange: any,
    submitFunction: any
}

const TransportForm:FC<IProps> = ({data, onChange, submitFunction, handleSelectChange}) =>{


    const driversDataContex = useDriverDataContext()
    const cargoDataContex = useCargoDataContext()

    const createDriversOptions = (data:any):any[] =>{
        const optionsList: any[] = []
        for (let i = 0; i < data.length; i++){
            optionsList.push(<option key={i} value={data[i]["_id"]}>{`${data[i]["firstName"]} ${data[i]["lastName"]}`}</option>)
        }
        return optionsList
    }

    const createCargoOptions = (data:any):any[] =>{
        const optionsList: any[] = []
        for (let i = 0; i < data.length; i++){
            optionsList.push(<option key={i} value={data[i]["_id"]}>{`${data[i]["name"]}`}</option>)
        }
        return optionsList
    }


    function renderSelectInput (nameOfField: "drivers" | "cargo", onChange: any):JSX.Element{
        let options = []
        if (nameOfField === "drivers"){
            const data = driversDataContex.state
            options = createDriversOptions(data)
        }
        if (nameOfField === "cargo"){
            const data = cargoDataContex.state.data
            options = createCargoOptions(data)
        }
        
        return (
            <div className="input-label-group">
                <label htmlFor={`${nameOfField}-select`}>{`Choose a ${nameOfField}`}:</label>

                <select onChange={nameOfField === "drivers"? handleSelectChange: onChange } multiple={nameOfField === "drivers"? true: false } name={nameOfField} id={`${nameOfField}-select`}>
                    {options}
                </select>
            </div>
        )
    }

    return(
        <div className="driver-form">
            <Input value={data.name} labelText="Name" type="text" length="long" name="name" onChange={onChange}/>
            <Input value={data.from} labelText="From" type="text" length="long" name="from" onChange={onChange}/>
            <Input value={data.to} labelText="To" type="text" length="long" name="to" onChange={onChange}/>
            {renderSelectInput("drivers",onChange)}
            {renderSelectInput("cargo", onChange)}

            <Button text="Add transport" onClick={submitFunction}/>
        </div>
    )
}


export default TransportForm