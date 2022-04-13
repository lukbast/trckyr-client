import { useState } from "react";
import { FetchState, ITransportData, ITransportForm } from "../../interfaces";
import axios from  "axios"
import { getAuthHeader } from "../utils";

export function useNewTransport(){
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [transports, setTransports] = useState<ITransportData[]>([])

    const newTransport = async (payload: ITransportForm) =>{
        const url = "http://localhost:8000"
        try {
            setFetchState(FetchState.LOADING)
            let params = new URLSearchParams( {
                name: payload.name,
                to_ : payload.to_,
                from_: payload.from_,
                cargo: payload.cargo
            })
            for (let val in payload.drivers){
                params.append("drivers", val)
            }
            await axios.post(`${url}/transports`, params ,getAuthHeader())

            const res2 = await axios.get(`${url}/transports`, getAuthHeader())
            const data = res2.data.data as ITransportData[];
            
            setTransports(data)
            setFetchState(FetchState.SUCCESS)
        } catch (e) {
            setFetchState(FetchState.ERROR)
        }
    }
    return [transports, fetchState, newTransport] as const;
}