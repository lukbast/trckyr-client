import { createContext, useReducer, useContext, ReactNode } from "react";
import {ITransportData, ITransportStatus, states} from "../interfaces"

import {removeData} from "../utils"
export const statusesPlaceholder:ITransportStatus[] = [
    {
        _id: 0,
        transportID: 0,
        state: states["Waiting for dispatch"], 
        begginingOfState: "23/05/2021 3:00",
        endOfState: "24/05/2021 20:00",
        duration: "0 days 17 hrs 0 mins",
        remaining: 1234,
        eta: "Unknown",
        coordinates: [52.254717669337616, 21.015183348860532]
    },{
        _id: 1,
        transportID: 0,
        state: states["Moving"], 
        begginingOfState: "24/05/2021 20:00",
        endOfState: "25/05/2021 4:13",
        duration: "0 days 8 hrs 13 mins",
        remaining: 634,
        eta: "0 days 16 hrs 13mins",
        coordinates: [52.254717669337616, 21.015183348860532]
    },
    {
        _id: 2,
        transportID: 0,
        state: states["Break to sleep"], 
        begginingOfState: "25/05/2021 4:13",
        endOfState: "25/05/2021 12:23",
        duration: "0 days 8 hrs 10 mins",
        remaining: 634,
        eta: "0 days 16 hrs 13mins",
        coordinates: [52.254717669337616, 21.015183348860532]
    },
    {
        _id: 3,
        transportID: 0,
        state: states["Moving"], 
        begginingOfState: "25/05/2021 4:13",
        endOfState: "",
        duration: "",
        remaining: 634,
        eta: "0 days 8 hrs 13mins",
        coordinates: [52.254717669337616, 21.015183348860532]
    },
]

const defaultState:ITransportData[] = [{
    _id: 0,
    name: "Chocholate bars for babushkaaaa",
    from: "UK, London",
    to: "Poland, Warsaw",
    drivers: [0, 1],
    cargo: 0,
    total: 1234,
    state: "In progress",
    addedBy: "TEST ACCOUNT",
    added: "23/05/2021",
    lastModified: "30/02/2022",
    statuses: statusesPlaceholder},{ 
    _id: 1,
    name: "asdff",
    from: "afsfffn",
    to: "ndfnfnf",
    drivers: [2],
    cargo: 0,
    total: 1234,
    state: "In progress",
    addedBy: "TEST ACCOUNT",
    added: "23/05/2021",
    lastModified: "30/02/2022",
    statuses: statusesPlaceholder
}]

export type State  = typeof defaultState

export enum ActionTypes {
    "ADD_TRANSPORT",
    "EDIT_TRANSPORT",
    "DELETE_TRANSPORT"
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
            return tempState
        case ActionTypes.EDIT_TRANSPORT:
            const temp = [...state]
            temp[action.payload._id] = action.payload
            console.log(temp)
            return temp
        case ActionTypes.DELETE_TRANSPORT:
            return removeData(action.payload._id, state)
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

