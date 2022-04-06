import { useState, useEffect } from 'react';
import './App.scss';
import LoginPage from './components/login-page/login-page';
import MainWindow from './components/main-window/main-window';


import { useFetchCargos } from "./requests/fetch-cargo"
import { useFetchDrivers } from "./requests/fetch-drivers"

import { useCargoDataContext, ActionTypes as CargoActions } from "./context/cargo-data-context"
import { useDriverDataContext, ActionTypes as DriverActions  } from "./context/driver-data-context"
import { useTransportDataContext, ActionTypes as TransportActions } from './context/transport-data-context';
import { UserActions, useUser } from './context/user-context';
import { FetchState } from "./interfaces"
import { useFetchTransports } from './requests/fetch-transports';



function App():JSX.Element {

  const user =  useUser().state; const dispatchUser = useUser().dispatch

  const cargoDataContext = useCargoDataContext()
  const driversDataContext = useDriverDataContext()
  const transportsDataContext = useTransportDataContext()

  const [cargos, cargosFetchStatus, getCargos] = useFetchCargos()
  const [drivers, driversFetchStatus, getDrivers] = useFetchDrivers()
  const [transports, transportsFetchStatus, getTransports] = useFetchTransports()

  const [cargoFetched, setCargoFetched] = useState<boolean>(false)
  const [driversFetched, setDriversFetched] = useState<boolean>(false)
  const [transportsFetched, setTransportsFetched] = useState<boolean>(false)
    
  // FETCHING CARGO DATA
  useEffect(() =>{
      if (!cargoFetched && user.loggedIn) {
          getCargos()
          setCargoFetched(true)
      }
      if (cargosFetchStatus === FetchState.SUCCESS){
          cargoDataContext.dispatch({type:CargoActions.FETCH_DATA, payload:cargos[0], tempPayload:cargos})
      }

  },[cargoFetched, cargosFetchStatus, user])

  // FETCHING DRIVERS DATA
  useEffect(() =>{
      if (!driversFetched && user.loggedIn) {
          getDrivers()
          setDriversFetched(true)
      }
      if (cargosFetchStatus === FetchState.SUCCESS){
          driversDataContext.dispatch({type:DriverActions.FETCH_DATA, payload:drivers[0], tempPayload:drivers})
      }

  },[driversFetched, driversFetchStatus, user.loggedIn])

   // FETCHING TRANSPORTS DATA
   useEffect(() =>{
    if (!transportsFetched && user.loggedIn) {
        getTransports()
        setTransportsFetched(true)
    }
    if (transportsFetchStatus === FetchState.SUCCESS){
        transportsDataContext.dispatch({type:TransportActions.FETCH_TRANSPORTS, payload:transports[0], tempPayload:transports})
    }

},[transportsFetched, transportsFetchStatus, user.loggedIn])

  const logOut = () => {
    dispatchUser({type:UserActions['LOG IN'] ,payload: user})
  }

  const logIn = (uname:string, psswd:string) => {
    dispatchUser({type:UserActions['LOG IN'] , payload: {username: uname, loggedIn: true}})
  }

  return (
      <>
      {
        cargoDataContext.state.length !== 0 &&
        driversDataContext.state.length !== 0 &&
        transportsDataContext.state.length !== 0 &&
        user.loggedIn ?
         <MainWindow logOut={logOut} user={user}/>: <LoginPage loginIn={logIn} user={user}/>
        }</>
  )
}

export default App;
