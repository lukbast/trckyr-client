import { useState } from "react";
import { FetchState, IDriverResponse } from "../interfaces";
import axios from  "axios"

export function useFetchDrivers(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [drivers, setDrivers] = useState<IDriverResponse>({data: []})

    const getDrivers= async () =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)

            const res = await axios.get(`${url}/drivers`)
            const data = res.data as IDriverResponse;

            setDrivers(data)
            setFetchState(FetchState.SUCCESS)
        } catch {
            setFetchState(FetchState.ERROR)
        }
    }
    return [drivers, fetchState, getDrivers] as const;
}