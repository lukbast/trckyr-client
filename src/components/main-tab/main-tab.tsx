import { FC, useEffect, useState } from "react"
import { useWindowState } from "../../context/window-context"
import ManageCargosWindow from "../manage-cargos-window/manage-cargos-window"
import TransportWindow from "../transport-window/transport-window"
import "./main-tab.scss"
import ManageDriversWindow from "../manage-drivers-window/manage-driver-window"
import { DriversWindowProvider } from "../../context/drivers-window-context"
import { CargoWindowProvider } from "../../context/cargo-window-context"
import { useTransportDataContext } from "../../context/transport-data-context"
import { useSelectedTransport } from "../../context/selected-transport-context"

import NewTransportForm from "../new-transport-form/new-transport-form"
import { useFetchCargos } from "../../requests/fetch-cargo"
import { useFetchDrivers } from "../../requests/fetch-drivers"
import { useCargoDataContext, ActionTypes as CargoActions } from "../../context/cargo-data-context"
import { useDriverDataContext, ActionTypes as DriverActions  } from "../../context/driver-data-context"
import { FetchState } from "../../interfaces"


const MainTab:FC = ():JSX.Element =>{

        
    const cargoDataContext = useCargoDataContext()
    const driversDataContext = useDriverDataContext()
  
    const [cargos, cargosFetchStatus, getCargos] = useFetchCargos()
    const [drivers, driversFetchStatus, getDrivers] = useFetchDrivers()

    const [cargoFetched, setCargoFetched] = useState<boolean>(false)
    const [driversFetched, setDriversFetched] = useState<boolean>(false)
   
    // FETCHING CARGO DATA
    useEffect(() =>{
        if (!cargoFetched) {
            getCargos()
            setCargoFetched(true)
        }
        if (cargosFetchStatus === FetchState.SUCCESS){
            cargoDataContext.dispatch({type:CargoActions.FETCH_DATA, payload:cargos.data[0], tempPayload:cargos.data})
        }

    },[cargoFetched, cargosFetchStatus])

    // FETCHING DRIVERS DATA
    useEffect(() =>{
        if (!driversFetched) {
            getDrivers()
            setDriversFetched(true)
        }
        if (cargosFetchStatus === FetchState.SUCCESS){
            driversDataContext.dispatch({type:DriverActions.FETCH_DATA, payload:drivers.data[0], tempPayload:drivers.data})
        }

    },[driversFetched, driversFetchStatus])


    const {state, dispatch} = useWindowState()
    const transportDataContext = useTransportDataContext()
    const selectedTransport = useSelectedTransport()


    const display = ():JSX.Element =>{
        const data = transportDataContext.state[selectedTransport.state.index]
        if (state.newTransportWindow) {
            return <NewTransportForm/>
        } else if (state.newDriverWindow) {
            return <DriversWindowProvider><ManageDriversWindow/></DriversWindowProvider>
        } else if (state.newCargo) {
            return <CargoWindowProvider><ManageCargosWindow/></CargoWindowProvider>
        }
        return <TransportWindow data={data}/>
    }

    return(
        <div className="main-tab hide-srollbars">
            {display()}
        </div>
    )
}


export default MainTab