import { useEffect, useState } from "react"
import { User } from "../../App"
import { useCargoDataContext, ActionTypes as CargoActions } from "../../context/cargo-data-context"
import { FetchState, ICargoData, ICargoResponse } from "../../interfaces"
import { useFetchCargos } from "../../requests/fetch-cargo"
import Button from "../button/button"
import Input from "../input/input"


import "./login-page.scss"

interface IState{
    formData:{
        username: string,
        password: string
    }
}

interface IProps{
    setUser: any
    user: User
}

const LoginPage:React.FC<IProps> = ({setUser, user}):JSX.Element =>{

    const [state, setState] = useState<IState["formData"]>({username:"", password:""})
    const cargoDataContext = useCargoDataContext()
    const [cargos, fetchStatus, getCargos] = useFetchCargos()

    useEffect(() => {
        if (fetchStatus === FetchState.SUCCESS){
            cargoDataContext.dispatch({type:CargoActions.FETCH_DATA, payload:cargos.data[0], tempPayload:cargos.data})
            console.log(cargos)
            setUser({...user, username: state.username})
        }
        return function updateState(){
            
        }
    },[fetchStatus])


    const changeListener = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setState({...state,
            [e.target.name]: e.target.value
        })
    }

    const btnClickClistener = async () =>{
        await getCargos()
        
    }


    return(
        <div className="login-page">
            <div className="login-box">
                {fetchStatus === FetchState.LOADING && <p>Fetching Cargos...</p>}
                {fetchStatus === FetchState.ERROR && <p>Seomething went wrong</p>}
                {fetchStatus === FetchState.DEFAULT && <>
                <Input onChange={changeListener} type="text" name="username" labelText="Username" length="long"/>
                <Input onChange={changeListener} type="password" name="password" labelText="Password" length="long"/>
                <Button onClick={btnClickClistener} text="Log in"/>
                </>
                }

            </div>
        </div>
    )
}


export default LoginPage