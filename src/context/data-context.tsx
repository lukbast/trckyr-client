import { createContext, useReducer, useContext, ReactNode } from "react";
import { IData } from "../interfaces";

const defaultState:IData = {
    transport: [],
    cargo: [],
    drivers: []

}

export enum ActionTypes {"FETCH_DATA", "FETCH_TRANSPORTS", "FETCH_CARGOS", "FETCH_DRIVERS"}

interface IAction{
    type: ActionTypes,
    payload: IData,
}

interface IDataContext {
    state: IData,
    dispatch: React.Dispatch<IAction>
}

interface IDataProviderProps{
    children: ReactNode
}

const DataContext = createContext<IDataContext>({state: defaultState, dispatch: () => undefined})

function dataReducer (state: IData, action: IAction):IData {
    switch (action.type){
        case ActionTypes.FETCH_DATA:
            return action.payload
        case ActionTypes.FETCH_TRANSPORTS:
            return {...state, transport: action.payload.transport}
        case ActionTypes.FETCH_CARGOS:
            return {...state, cargo: action.payload.cargo}
        case ActionTypes.FETCH_DRIVERS:
            return {...state, drivers: action.payload.drivers}
    }
}

export function DataProvider(props: IDataProviderProps) {
    const [state, dispatch] = useReducer(dataReducer, defaultState)

    return (
        <DataContext.Provider value={{state, dispatch}}>
                {props.children}
        </DataContext.Provider>
    )
}


export function useDataContext (){
    const context = useContext(DataContext)

    if (!context) throw new Error("useDataContext must be used inside a DataProvider")

    return context
}