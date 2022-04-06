import { useState } from "react";
import { FetchState, ICargoData } from "../interfaces";
import axios from  "axios"

export function useFetchCargos(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [cargos, setCargos] = useState<ICargoData[]>([])

    const getCargos = async () =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)

            const res = await axios.get(`${url}/cargos`)
            const data = res.data.data as ICargoData[];
            console.log(data)
            setCargos(data)
            setFetchState(FetchState.SUCCESS)
        } catch {
            setFetchState(FetchState.ERROR)
        }
    }
    return [cargos, fetchState, getCargos] as const;
}