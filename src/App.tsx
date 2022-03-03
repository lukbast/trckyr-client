import { useState } from 'react';
import './App.css';
import LoginPage from './components/login-page/login-page';

function App():JSX.Element {

  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  return (
      <>{
        loggedIn? "": <LoginPage hider={setLoggedIn}/>
        
      }</>
  )
}

export default App;
