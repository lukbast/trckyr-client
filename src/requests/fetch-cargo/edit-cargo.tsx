import { useState } from "react";
import { FetchState, ICargoData, ICargoForm} from "../../interfaces";
import axios from  "axios"
import { getAuthHeader } from "../utils";


export function useEditCargo(){
    const [state, setState] = useState(FetchState.DEFAULT)
    const [data, setData] = useState<ICargoData[]>([])
    const [error, setError] = useState<string>("")

    const editCargo = async (payload: ICargoForm, id: number) =>{
        const url = "http://localhost:8000"
        try {
            setState(FetchState.LOADING)
            const res:ICargoData[] = await (await axios.patch(`${url}/cargos/${id}`, new URLSearchParams({
                ...payload
            }), getAuthHeader())).data.data

            

            setError("")
            setData(res)
            setState(FetchState.SUCCESS)
        } catch (e){
            setError(e as string)
            setState(FetchState.ERROR)
        }
    }
    return [data, state, editCargo, error] as const;
}