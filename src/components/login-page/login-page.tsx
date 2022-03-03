import { useState } from "react"
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
    hider: any
}

const LoginPage:React.FC<IProps> = ({hider}):JSX.Element =>{

    const [state, setState] = useState<IState["formData"]>({username:"", password:""})

    const changeListener = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }

    const btnClickClistener = () =>{
        hider(true)
    }

    return(
        <div className="login-page">
            <div className="login-box">

                <label className="label">Username</label>
                <Input onChange={changeListener} type="text" name="username"/>


                <label className="label">Password</label>
                <Input onChange={changeListener} type="password" name="password"/>

                <Button onClick={btnClickClistener} text="Log in"/>
            </div>
        </div>
    )
}


export default LoginPage