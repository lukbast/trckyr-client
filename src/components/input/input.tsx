import { FC } from "react"
import "./input.scss"

interface IProps {
    type: string,
    name: string,
    labelText: string,
    length: "short" | "long"
    onChange: any,
    value?: any
}

const Input:FC<IProps> = ({type, name,labelText, onChange,length, value}):JSX.Element =>{
    return(
        <div className="input-label-group">
            <label className="label">{labelText}</label>
            <input value={value} onChange={(e) => {onChange(e)}} className={`input ${length}`} name={name} type={type}/>
        </div>
    )
}

export default Input