import { useState, useEffect } from 'react';
import './App.scss';
import LoginPage from './components/login-page/login-page';
import MainWindow from './components/main-window/main-window';
import { ActionTypes, useDataContext } from './context/data-context';
import { UserActions, useUser } from './context/user-context/user-context';
import { FetchState } from "./interfaces"
import { useFetchCargos } from "./requests/fetch-cargo/fetch-cargo"
import { useFetchDrivers } from "./requests/fetch-drivers/fetch-drivers"
import { useFetchTransports } from './requests/fetch-transports/fetch-transports';
import { useLogin } from './requests/user-login/user-login';

function App():JSX.Element {

  const user =  useUser().state; const dispatchUser = useUser().dispatch
  const dataContext = useDataContext()
  const [cargos, cargosStatus, getCargos] = useFetchCargos()
  const [drivers, driversStatus, getDrivers] = useFetchDrivers()
  const [transports, transportsStatus, getTransports] = useFetchTransports()
  const [loginState, getUser, loginError] = useLogin()
  const [dataFetched, setDataFetched] = useState<boolean>(false)

  // HANDLE LOGING USER IN
  const logIn = (uname:string, psswd:string) => {
    getUser(uname, psswd)
  }

  useEffect(() =>{
    if (loginState === FetchState.SUCCESS || localStorage.getItem('username')) {
        dispatchUser({type:UserActions['LOG IN'] , payload: {username: localStorage.getItem('username') as string, loggedIn:true}})
    }
  },[loginState])


  // FETCHING DATA
  useEffect(() =>{
    if (!dataFetched && user.loggedIn) {
        getCargos()
        getDrivers()
        getTransports()
        setDataFetched(true)
    }
    if (cargosStatus === FetchState.SUCCESS,driversStatus === FetchState.SUCCESS,
        transportsStatus === FetchState.SUCCESS){
      dataContext.dispatch(
        {type:ActionTypes.FETCH_DATA, payload:{ transport: transports, cargo: cargos, drivers: drivers }
      })
    }

  },[dataFetched, cargosStatus,transportsStatus, driversStatus, user])

  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('username')
    dispatchUser({type:UserActions['LOG IN'] ,payload: {username: "", loggedIn: false}})
  }

  return (
      <>
      {
        dataContext.state.transport.length !== 0 &&
        dataContext.state.cargo.length !== 0 &&
        dataContext.state.drivers.length !== 0 &&
        user.loggedIn ?
        <MainWindow logOut={logOut} user={user}/>:
        <LoginPage
          loginIn={logIn}
          loginError={loginError}
        />
      }</>
  )
}

export default App;
