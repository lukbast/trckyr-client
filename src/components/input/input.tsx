import { FC } from "react"
import "./input.scss"

interface IProps {
    type: string,
    name: string,
    labelText: string,
    length: "short" | "long"
    onChange: any
}

const Input:FC<IProps> = ({type, name,labelText, onChange,length}):JSX.Element =>{
    return(
        <div className="input-label-group">
            <label className="label">{labelText}</label>
            <input onChange={(e) => {onChange(e)}} className={`input ${length}`} name={name} type={type}/>
        </div>
    )
}

export default Input