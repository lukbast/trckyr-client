import { useState } from "react";
import { FetchState, IDriverData, IDriverForm, } from "../../interfaces";
import axios from  "axios"
import { getAuthHeader } from "../utils";

export function useEditDriver(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [drivers, setDrivers] = useState<IDriverData[]>([])

    const editDriver = async (payload: IDriverForm, id:number) =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)
            const res = await axios.patch(`${url}/drivers/${id}`, new URLSearchParams({
                ...payload
            }) ,getAuthHeader())
            const data = res.data.data as IDriverData[];
            
            setDrivers(data)
            setFetchState(FetchState.SUCCESS)
        } catch {
            setFetchState(FetchState.ERROR)
        }
    }
    return [drivers, fetchState, editDriver] as const;
}