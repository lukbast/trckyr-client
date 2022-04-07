import { useState } from "react";
import { FetchState} from "../../interfaces";
import axios from  "axios"

interface IData {
    token: string,
    username:string
}

export function useLogin(){
    const [loginState, setLoginState] = useState(FetchState.DEFAULT)
    const [error, setError] = useState<string>("")

    const getUser = async (username:string, password: string) =>{
        const url = "http://localhost:8000"
        try {
            setLoginState(FetchState.LOADING)
            const res:IData = await (await axios.post(`${url}/user/login`, new URLSearchParams({
                username: username,
                password: password
            }))).data

            
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', res.username)
            setError("")
            setLoginState(FetchState.SUCCESS)
        } catch (e){
            setLoginState(FetchState.ERROR)
            setError(e as string)
        }
    }
    return [loginState, getUser, error] as const;
}