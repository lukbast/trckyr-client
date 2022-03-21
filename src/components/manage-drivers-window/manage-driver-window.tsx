import { FC } from "react"
import DriversList from "../drivers-list/drivers-list"
import NewDriverForm from "../new-driver-form/new-driver-form"
import Subwindow from "../subwindow/subwindow"
import "./manage-drivers-window.scss"



const ManageDriversWindow:FC = ():JSX.Element =>{



    return(
        <div className="manage-drivers-window">
            <DriversList/>
            <Subwindow>
                <NewDriverForm/>
            </Subwindow>
        </div>
    )
}


export default ManageDriversWindow