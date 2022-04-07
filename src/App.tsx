import { useState, useEffect } from 'react';
import './App.scss';
import LoginPage from './components/login-page/login-page';
import MainWindow from './components/main-window/main-window';

import { useCargoDataContext, ActionTypes as CargoActions } from "./context/cargo-data-context"
import { useDriverDataContext, ActionTypes as DriverActions  } from "./context/driver-data-context"
import { useTransportDataContext, ActionTypes as TransportActions } from './context/transport-data-context';
import { UserActions, useUser } from './context/user-context/user-context';

import { FetchState } from "./interfaces"

import { useFetchCargos } from "./requests/fetch-cargo/fetch-cargo"
import { useFetchDrivers } from "./requests/fetch-drivers/fetch-drivers"
import { useFetchTransports } from './requests/fetch-transports/fetch-transports';
import { useLogin } from './requests/user-login/user-login';
import { logoutReq } from './requests/user-login/user-logout';
import { useSession } from './requests/user-login/user-session';

function App():JSX.Element {

  const user =  useUser().state; const dispatchUser = useUser().dispatch

  const cargoDataContext = useCargoDataContext()
  const driversDataContext = useDriverDataContext()
  const transportsDataContext = useTransportDataContext()

  const [cargos, cargosFetchStatus, getCargos] = useFetchCargos()
  const [drivers, driversFetchStatus, getDrivers] = useFetchDrivers()
  const [transports, transportsFetchStatus, getTransports] = useFetchTransports()

  const [loginState, getUser, loginError] = useLogin()
  const [sesssionState, getSesssion, sesssionError] = useSession()

  const [cargoFetched, setCargoFetched] = useState<boolean>(false)
  const [driversFetched, setDriversFetched] = useState<boolean>(false)
  const [transportsFetched, setTransportsFetched] = useState<boolean>(false)

  // HANDLE LOGING USER IN
  const logIn = (uname:string, psswd:string) => {
    getUser(uname, psswd)
  }

  useEffect(() =>{
    if(localStorage.getItem("username") && localStorage.getItem("token")){
        if(sesssionState === FetchState.DEFAULT){
          getSesssion()
        }
    }

    if (loginState === FetchState.SUCCESS || localStorage.getItem('username') && sesssionState === FetchState.SUCCESS) {
        dispatchUser({type:UserActions['LOG IN'] , payload: {username: localStorage.getItem('username') as string, loggedIn:true}})
    }
  },[loginState, sesssionState])


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
    logoutReq()
    localStorage.removeItem("token")
    localStorage.removeItem('username')
    dispatchUser({type:UserActions['LOG IN'] ,payload: {username: "", loggedIn: false}})
  }

  return (
      <>
      {
        cargoDataContext.state.length !== 0 &&
        driversDataContext.state.length !== 0 &&
        transportsDataContext.state.length !== 0 &&
        user.loggedIn ?
        <MainWindow logOut={logOut} user={user}/>:
        <LoginPage
          loginIn={logIn}
          loginError={loginError}
          sessionError={sesssionError}
        />
      }</>
  )
}

export default App;
