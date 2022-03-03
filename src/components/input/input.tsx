import { FC } from "react"
import "./input.scss"

interface IProps {
    type: string,
    name: string
    onChange: any
}

const Input:FC<IProps> = ({type, name, onChange}):JSX.Element =>{
    return(
        <input onChange={(e) => {onChange(e)}} className="input" name={name} type={type}/>
    )
}

export default Input