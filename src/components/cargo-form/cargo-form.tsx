import { FC} from "react"
import "./cargo-form.scss"
import { ICargoData } from "../../interfaces"
import Button from "../button/button"
import Input from "../input/input"

interface IProps {
    onChange: any,
    submitFunction: any,
    buttonText: string,
    data : ICargoData
}


const CargoForm:FC<IProps> = ({onChange, submitFunction, buttonText, data}) => {

    return(
        <div className="cargo-form">
            <Input type="text" name="name" value={data? data.name: ""} onChange={onChange} labelText="Name" length="long"/>
            <div className="input-group">
                <Input type="number" name="weight" onChange={onChange} labelText="Weigth" length="short" value={data? data.weight: ""}/>
                <Input type="text" name="weightUnit" onChange={onChange} labelText="Unit" length="short" value={data? data.weightUnit: ""}/>
            </div>
            <div className="input-group">
                <Input type="number" name="quantity" onChange={onChange} labelText="Quantity" length="short" value={data? data.quantity: ""}/>
                <Input type="text" name="quantityUnit" onChange={onChange} labelText="Unit" length="short" value={data? data.quantityUnit: ""}/>
            </div>
            <Input type="text" name="info" labelText="Additional info" length="long" onChange={onChange} value={data? data.info: ""}/>
            <div className="button-div">
                <Button text={buttonText} onClick={submitFunction} />
            </div>
        </div>
    )
}


export default CargoForm