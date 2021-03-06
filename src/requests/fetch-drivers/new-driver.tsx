import { useState } from "react";
import { FetchState, IDriverData, IDriverForm } from "../../interfaces";
import axios from  "axios"
import { getAuthHeader } from "../utils";

export function useNewDriver(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [drivers, setDrivers] = useState<IDriverData[]>([])

    const newDriver = async (payload: IDriverForm) =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)
            const res = await axios.post(`${url}/drivers`, new URLSearchParams({
                ...payload
            }) ,getAuthHeader())
            const data = res.data.data as IDriverData[];

            setDrivers(data)
            setFetchState(FetchState.SUCCESS)
        } catch (e) {
            setFetchState(FetchState.ERROR)
        }
    }
    return [drivers, fetchState, newDriver] as const;
}