import { useState } from 'react';
import './App.scss';
import LoginPage from './components/login-page/login-page';
import MainWindow from './components/main-window/main-window';

function App():JSX.Element {

  const [loggedIn, setLoggedIn] = useState<boolean>(true)

  return (
      <>{
        loggedIn? <MainWindow/>: <LoginPage hider={setLoggedIn}/>
        
      }</>
  )
}

export default App;
