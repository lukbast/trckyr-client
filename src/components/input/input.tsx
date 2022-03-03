import { FC } from "react"
import "./input.scss"

interface IProps {
    type: string,
    name: string
}

const Input:FC<IProps> = ({type, name}) =>{
    return(
        <input className="input" name={name} type={type}/>
    )
}

export default Input