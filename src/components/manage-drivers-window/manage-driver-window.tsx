import { FC } from "react"
import NewDriverForm from "../new-driver-form/new-driver-form"
import Subwindow from "../subwindow/subwindow"
import "./manage-drivers-window.scss"



const ManageDriversWindow:FC = ():JSX.Element =>{



    return(
        <div className="manage-drivers-window">

            <Subwindow>
                <NewDriverForm/>
            </Subwindow>
        </div>
    )
}


export default ManageDriversWindow