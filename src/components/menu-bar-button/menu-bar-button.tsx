import { FC } from "react"
import "./menu-bar-button.scss"

interface IProps {
    text: string,
    onClick: any
}

const MenuBarButton:FC<IProps> = ({text,onClick}):JSX.Element =>{
    return(
        <button className="menu-bar-button" onClick={onClick}>{text}</button>
    )
} 


export default MenuBarButton