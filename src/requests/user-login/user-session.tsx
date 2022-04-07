import { useState } from "react";
import { FetchState } from "../../interfaces";
import axios from  "axios"
import { getToken } from "../utils";



export function useSession(){
    const [sessionState, setSessionState] = useState(FetchState.DEFAULT)
    const [error, setError] = useState<string>("")

    const getSession = async () =>{
        const url = "http://localhost:8000"
        try {
            setSessionState(FetchState.LOADING)
            const res= await (await axios.get(`${url}/user/login`, {headers: {
                Authorization: 'Bearer ' + getToken()
              }}))

              setSessionState(FetchState.SUCCESS)
              setError("")
        } catch (e){
            localStorage.removeItem('username')
            localStorage.removeItem('token')
            setSessionState(FetchState.ERROR)
            setError(e as string)
        }
    }
    return [sessionState, getSession, error] as const;
}