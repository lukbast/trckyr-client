import { useState } from 'react';
import './App.scss';
import LoginPage from './components/login-page/login-page';
import MainWindow from './components/main-window/main-window';

export interface User{
  username: string
}

function App():JSX.Element {

  const [user, setUser] = useState<User>({username: "TEST ACCOUNT"})

  const logOut =() => {
    setUser({username: ""})
  }

  return (
      <>{
        user.username? <MainWindow logOut={logOut} user={user}/>: <LoginPage setUser={setUser} user={user}/>
        
      }</>
  )
}

export default App;
