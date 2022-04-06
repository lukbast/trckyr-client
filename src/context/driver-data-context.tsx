import { createContext, useReducer, useContext, ReactNode } from "react";
import { IDriverData } from "../interfaces";
import {removeData} from "../utils"


const defaultState:IDriverData[] = []

type State = typeof defaultState

export enum ActionTypes {
    "FETCH_DATA",
    "ADD_DRIVER",
    "EDIT_DRIVER",
    "DELETE_DRIVER"
}

interface IAction{
    type: ActionTypes,
    payload: IDriverData,
    tempPayload?: IDriverData[]
}

interface IDriverDataContext {
    state: State,
    dispatch: React.Dispatch<IAction>
}

interface IDriverDataProviderProps{
    children: ReactNode
}

const DriverDataContext = createContext<IDriverDataContext>({state: defaultState, dispatch: () => undefined})

function cargoReducer (state: State, action: IAction):State {
    switch (action.type){
        case ActionTypes.FETCH_DATA:
            return action.tempPayload as IDriverData[]
        case ActionTypes.ADD_DRIVER:
            const tempData = [...state]
            tempData.push(action.payload)
            console.log(tempData)
            return tempData
        case ActionTypes.EDIT_DRIVER:
            const tempState = state
            tempState[action.payload._id] = action.payload
            return tempState
        case ActionTypes.DELETE_DRIVER:
            const cleanedData = removeData(action.payload._id, state)
            return(cleanedData)
    }
}

export function DriverDataProvider(props: IDriverDataProviderProps) {
    const [state, dispatch] = useReducer(cargoReducer, defaultState)

    return (
        <DriverDataContext.Provider value={{state, dispatch}}>
                {props.children}
        </DriverDataContext.Provider>
    )
}


export function useDriverDataContext (){
    const context = useContext(DriverDataContext)

    if (!context) throw new Error("useDriverDataContext must be used inside a DriverDataProvider")

    return context
}