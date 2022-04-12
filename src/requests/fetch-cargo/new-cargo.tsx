import { useState } from "react";
import { FetchState, ICargoData, ICargoForm} from "../../interfaces";
import axios from  "axios"
import { getAuthHeader } from "../utils";


export function useNewCargo(){
    const [state, setState] = useState(FetchState.DEFAULT)
    const [data, setData] = useState<ICargoData[]>([])
    const [error, setError] = useState<string>("")

    const newCargo = async (payload: ICargoForm) =>{
        const url = "http://localhost:8000"
        try {
            setState(FetchState.LOADING)
            const res:ICargoData[] = await (await axios.post(`${url}/cargos`, new URLSearchParams({
                ...payload
            }), getAuthHeader())).data.data as ICargoData[]

            

            setData(res)
            setState(FetchState.SUCCESS)
        } catch (e){
            setError(e as string)
            setState(FetchState.ERROR)
        }
    }
    return [data, state, newCargo, error] as const;
}