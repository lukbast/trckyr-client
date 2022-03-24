import { FC } from "react"
import "./menu-bar-button.scss"

interface IProps {
    text: string,
    onClick: any,
    icon: string,
    selected: boolean
}




const MenuBarButton:FC<IProps> = ({text,onClick, icon, selected}):JSX.Element =>{

    const renderIcon = ():JSX.Element =>{
        return(
            <img className="icon" src={icon} alt={text + " button"}/>
        )
    }


    return(
        <button className={selected? "menu-bar-button selected-menu-bar-button" :"menu-bar-button"} onClick={onClick}>{renderIcon()} {text}</button>
    )
} 


export default MenuBarButton