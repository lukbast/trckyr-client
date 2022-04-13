import { useState } from "react";
import { FetchState, ITransportData } from "../../interfaces";
import axios from  "axios"
import { getAuthHeader, getToken } from "../utils";

export function useFetchTransports(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [transports, setTransports] = useState<ITransportData[]>([])

    const getCargos = async () =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)

            const res = await axios.get(`${url}/transports`, getAuthHeader())
            const data = res.data.data as ITransportData[];
            setTransports(data)
            setFetchState(FetchState.SUCCESS)
        } catch {
            setFetchState(FetchState.ERROR)
        }
    }
    return [transports, fetchState, getCargos] as const;
}