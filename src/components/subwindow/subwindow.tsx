import { FC } from "react"
import "./subwindow.scss"

interface IProps {
    children: FC
}

const Subwindow:FC<IProps> = ({children}):JSX.Element =>{
    return(
        <div className="Subwindow">
            {children}
        </div>
    )
}


export default Subwindow