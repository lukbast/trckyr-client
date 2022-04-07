import { useState } from "react";
import { FetchState, IDriverData, } from "../../interfaces";
import axios from  "axios"
import { getToken } from "../utils";

export function useFetchDrivers(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [drivers, setDrivers] = useState<IDriverData[]>([])

    const getDrivers= async () =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)

            const res = await axios.get(`${url}/drivers`, {headers: {
                Authorization: 'Bearer ' + getToken()
              }})
            const data = res.data.data as IDriverData[];

            setDrivers(data)
            setFetchState(FetchState.SUCCESS)
        } catch {
            setFetchState(FetchState.ERROR)
        }
    }
    return [drivers, fetchState, getDrivers] as const;
}