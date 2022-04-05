import { useState } from "react";
import { FetchState, ICargoData, ICargoResponse } from "../interfaces";
import axios from  "axios"

export function useFetchCargos(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [cargos, setCargos] = useState<ICargoResponse>({data: []})

    const getCargos = async () =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)

            const res = await axios.get(`${url}/cargos`)
            const data = res.data as ICargoResponse;

            setCargos(data)
            setFetchState(FetchState.SUCCESS)
        } catch {
            setFetchState(FetchState.ERROR)
        }
    }
    return [cargos, fetchState, getCargos] as const;
}