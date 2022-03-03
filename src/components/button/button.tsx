import { FC } from "react"
import "./button.scss"

interface IButtonProps {
    text: string
}

const Button:FC<IButtonProps> = ({text}) =>{
    return(
        <button className="button">{text}</button>
    )
}

export default Button