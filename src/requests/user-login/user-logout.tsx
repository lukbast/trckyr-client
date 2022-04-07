import axios from  "axios"
import { getToken } from "../utils";

export const logoutReq = async () =>{
    const url = "http://localhost:8000"
    const token = getToken()
    try {   
            await axios.post(`${url}/user/logout`,{}, {headers: {
            Authorization: 'Bearer ' + token
            }})
    } catch (e){
        console.log(e)
    }
}