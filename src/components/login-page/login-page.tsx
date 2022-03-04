import { useState } from "react"
import { User } from "../../App"
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
    setUser: any
    user: User
}

const LoginPage:React.FC<IProps> = ({setUser, user}):JSX.Element =>{

    const [state, setState] = useState<IState["formData"]>({username:"", password:""})

    const changeListener = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value
        })
        console.log(state)
    }

    const btnClickClistener = () =>{
        setUser({...user, username: state.username})
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