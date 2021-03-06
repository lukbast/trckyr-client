import "./transport-form.scss"
import { FC} from "react"
import { ITransportForm} from "../../interfaces"
import Button from "../button/button"
import Input from "../input/input"
import { useDataContext } from "../../context/data-context"


interface IProps{
    data: ITransportForm,
    onChange: any,
    handleSelectChange: any,
    submitFunction: any,
    buttonText: string
}

const TransportForm:FC<IProps> = ({data, onChange, submitFunction, handleSelectChange, buttonText}) =>{

    const dataContext = useDataContext()

    const createDriversOptions = (data:any):any[] =>{
        const optionsList: any[] = []
        for (let i = 0; i < data.length; i++){
            optionsList.push(<option key={i} value={data[i]["_id"]}>{`${data[i]["firstname"]} ${data[i]["lastname"]}`}</option>)
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
            const data = dataContext.state.drivers
            options = createDriversOptions(data)
        }
        if (nameOfField === "cargo"){
            const data = dataContext.state.cargo
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
        <div className="transport-form-container">
            <div className="driver-form transport-form">
                <Input value={data.name} labelText="Name" type="text" length="long" name="name" onChange={onChange}/>
                <Input value={data.from_} labelText="From" type="text" length="long" name="from_" onChange={onChange}/>
                <Input value={data.to_} labelText="To" type="text" length="long" name="to_" onChange={onChange}/>

                <Button text={buttonText} onClick={submitFunction}/>
                
            </div>
            <div className="selects">
                    {renderSelectInput("drivers",onChange)}
                    {renderSelectInput("cargo", onChange)}
            </div>
        </div>
        
    )
}


export default TransportForm