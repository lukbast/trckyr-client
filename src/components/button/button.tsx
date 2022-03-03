import { FC } from "react"
import "./button.scss"

interface IButtonProps {
    text: string,
    onClick: any
}

const Button:FC<IButtonProps> = ({text, onClick}):JSX.Element =>{
    return(
        <button className="button" onClick={onClick}>{text}</button>
    )
}

export default Button