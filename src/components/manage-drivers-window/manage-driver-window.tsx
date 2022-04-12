import { FC } from "react"
import { useDriversWindowContext } from "../../context/drivers-window-context"
import DriverPreview from "../driver-preview/driver-preview"
import DriversList from "../drivers-list/drivers-list"
import EditDriverForm from "../edit-driver-form/edit-driver-form"
import NewDriverForm from "../new-driver-form/new-driver-form"
import Subwindow from "../subwindow/subwindow"
import "./manage-drivers-window.scss"


const ManageDriversWindow:FC = ():JSX.Element =>{



    const windowContext = useDriversWindowContext()

    const renderSubwindowContent = ():JSX.Element =>{
        if (windowContext.state.showSelected){
            return <DriverPreview/>
        }
        if (windowContext.state.showNew){
            return <NewDriverForm/>
        }
        else{
            return <EditDriverForm/>
        }
    }

    return(
        <div className="manage-drivers-window">
            <DriversList/>
            <Subwindow>
                {renderSubwindowContent()}
            </Subwindow>
        </div>
    )
}


export default ManageDriversWindow