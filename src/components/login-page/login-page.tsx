import { useState } from "react"
import { User } from "../../interfaces"


import Button from "../button/button"
import Input from "../input/input"

import "./login-page.scss"

interface IState{
    formData:{
        username: string,
        password: string
    }
}

interface IProps{
    loginIn: any
    user: User
}

const LoginPage:React.FC<IProps> = ({loginIn, user}):JSX.Element =>{

    const [state, setState] = useState<IState["formData"]>({username:"", password:""})

    const changeListener = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value
        })
    }

    const btnClickClistener = async () =>{
        loginIn(state.username, state.password)
        
    }

    return(
        <div className="login-page">
            <div className="login-box">
                <Input onChange={changeListener} type="text" name="username" labelText="Username" length="long"/>
                <Input onChange={changeListener} type="password" name="password" labelText="Password" length="long"/>
                <Button onClick={btnClickClistener} text="Log in"/>
            </div>
        </div>
    )
}

export default LoginPage