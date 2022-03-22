import { createContext, useReducer, useContext, ReactNode } from "react";
import {ITransportData} from "../interfaces"

const defaultState:ITransportData[] = [{
    _id: 0,
    name: "Chocholate bars for babushka",
    from: "UK, London",
    to: "Poland, Warsaw",
    drivers: [0, 1],
    cargo: 1,
    total: 1234,
    remaining: 86,
    eta: "2 hr 32 min",
    state: "In progress",
    coordinates: [52.254717669337616, 21.015183348860532]
},{ 
    _id: 1,
    name: "asdff",
    from: "afsfffn",
    to: "ndfnfnf",
    drivers: [0, 1],
    cargo: 2,
    total: 1234,
    remaining: 86,
    eta: "2 hr 32 min",
    state: "In progress",
    coordinates: [52.254717669337616, 21.015183348860532]
}]

export type State  = typeof defaultState

export enum ActionTypes {
    "ADD_TRANSPORT"
}

interface IAction{
    type: ActionTypes,
    payload: ITransportData
}

interface ITransportDataContext {
    state: State,
    dispatch: React.Dispatch<IAction>

}

interface ITransportDataProviderProps{
    children: ReactNode
}

const TransportContext = createContext<ITransportDataContext>({state: defaultState, dispatch: () => undefined})

function transportDataReducer (state: State, action: IAction):State {
    switch (action.type) {
        case ActionTypes.ADD_TRANSPORT:
            const tempState = [...state]
            tempState.push(action.payload)
            return []
    }
}

export function TransportDataProvider(props: ITransportDataProviderProps) {
    const [state, dispatch] = useReducer(transportDataReducer, defaultState)

    return (
        <TransportContext.Provider value={{state, dispatch}}>
                {props.children}
        </TransportContext.Provider>
    )
}


export function useTransportDataContext (){
    const context = useContext(TransportContext)

    if (!context) throw new Error("useTransportContext must be used inside a TransportDataProvider")

    return context
}

