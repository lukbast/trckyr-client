import Button from "../button/button"
import Input from "../input/input"

import "./login-page.scss"

const LoginPage:React.FC = () =>{
    return(
        <div className="login-page">
            <div className="login-box">

                <label className="label">Username</label>
                <Input type="password" name="password"/>

                <label className="label">Password</label>
                <Input type="text" name="username"/>

                <Button text="Log in"/>
            </div>
        </div>
    )
}


export default LoginPage