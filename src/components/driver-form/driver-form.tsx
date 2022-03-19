import { FC } from "react"
import "./driver-form.scss"
import Button from "../button/button"
import Input from "../input/input"

interface IProps {
    buttonText: string,
    onChange: any,
    submitFunction: any
}

const DriverForm:FC<IProps> = ({onChange, submitFunction}):JSX.Element =>{
    return(
        <div className="driver-form">
            <Input name="name" type="text" labelText="Name" length="long" onChange={onChange} />
            <Input name="phone" type="text" labelText="Phone" length="long" onChange={onChange} />
            <Input name="email" type="text" labelText="email" length="long" onChange={onChange} />
            <div className="button-div">
                <Button text="Add driver" onClick={submitFunction} />
            </div>
        </div>
    )
}

export default DriverForm