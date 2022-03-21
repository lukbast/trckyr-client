import { createContext, useReducer, useContext, ReactNode } from "react";
import { IDriverData } from "../interfaces";


const defaultState:IDriverData[] = [
    {_id: 0,
    firstName: "Grzegorz",
    lastName: "Brzęszyczykiewicz",
    phone: "123456789",
    email: "gbrzeszcz@asdfmail.com"},
    {_id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "987654321",
    email: "john.doe@qwertymail.com"},
    {_id: 2,
    firstName: "Random",
    lastName: "Dude",
    phone: "112233445566",
    email: "dude@zxcvbmail.com"}
]

type State = typeof defaultState

export enum ActionTypes {
    "ADD_DRIVER",
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