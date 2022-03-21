import { FC } from "react"
import "./driver-form.scss"
import Button from "../button/button"
import Input from "../input/input"
import { IDriverData } from "../../interfaces"

interface IProps {
    buttonText: string,
    onChange: any,
    submitFunction: any,
    data: IDriverData
}

const DriverForm:FC<IProps> = ({onChange, submitFunction, buttonText, data}):JSX.Element =>{
    return(
        <div className="driver-form">
            <Input value={data.firstName} name="firstName" type="text" labelText="First name" length="long" onChange={onChange} />
            <Input value={data.lastName} name="lastName" type="text" labelText="Last name" length="long" onChange={onChange} />
            <Input value={data.phone} name="phone" type="text" labelText="Phone" length="long" onChange={onChange} />
            <Input value={data.email} name="email" type="text" labelText="email" length="long" onChange={onChange} />
            <div className="button-div">
                <Button text={buttonText} onClick={submitFunction} />
            </div>
        </div>
    )
}

export default DriverForm