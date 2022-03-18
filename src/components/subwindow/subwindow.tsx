import { FC } from "react"
import "./subwindow.scss"

interface IProps {
    children: JSX.Element
}

const Subwindow:FC<IProps> = ({children}):JSX.Element =>{
    return(
        <div className="subwindow">
            {children}
        </div>
    )
}


export default Subwindow