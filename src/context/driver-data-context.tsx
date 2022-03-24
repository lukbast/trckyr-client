import { createContext, useReducer, useContext, ReactNode } from "react";
import { IDriverData } from "../interfaces";
import {removeData} from "../utils"


const defaultState:IDriverData[] = [
    {_id: 0,
    firstName: "Grzegorz",
    lastName: "Brzęszyczykiewicz",
    phone: "123456789",
    email: "gbrzeszcz@asdfmail.com",
    addedBy: "TEST ACCOUNT",
    added: "23/05/2021",
    lastModified: "30/02/2022" 
    },
    {_id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "987654321",
    email: "john.doe@qwertymail.com",
    addedBy: "TEST ACCOUNT",
    added: "23/05/2021",
    lastModified: "30/02/2022" },
    {_id: 2,
    firstName: "Random",
    lastName: "Dude",
    phone: "112233445566",
    email: "dude@zxcvbmail.com",
    addedBy: "TEST ACCOUNT",
    added: "23/05/2021",
    lastModified: "30/02/2022" }
]

type State = typeof defaultState

export enum ActionTypes {
    "ADD_DRIVER",
    "EDIT_DRIVER",
    "DELETE_DRIVER"
}

interface IAction{
    type: ActionTypes,
    payload: IDriverData
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