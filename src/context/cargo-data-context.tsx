import { createContext, useReducer, useContext, ReactNode } from "react";
import { ICargoData } from "../interfaces";
import { removeData } from "../utils";

const defaultState:ICargoData[] = []

export type State  = typeof defaultState

export enum ActionTypes {
    "FETCH_DATA",
    "ADD_CARGO",
    "DELETE_CARGO",
    "EDIT_CARGO"
}

interface IAction{
    type: ActionTypes,
    payload: ICargoData,
    tempPayload?: ICargoData[]
}

interface ICargoDataContext {
    state: State,
    dispatch: React.Dispatch<IAction>

}

interface ICargoDataProviderProps{
    children: ReactNode
}


const CargoContext = createContext<ICargoDataContext>({state: defaultState, dispatch: () => undefined})

function cargoReducer (state: State, action: IAction):State {
    switch (action.type){
        case ActionTypes.FETCH_DATA:
            return  action.tempPayload as ICargoData[]
        case ActionTypes.ADD_CARGO:
            const newData = state
            newData.push(action.payload)
            return(newData)
        case ActionTypes.DELETE_CARGO:
            const cleanedData = removeData(action.payload._id, state)
            return(cleanedData)
        case ActionTypes.EDIT_CARGO:
            const tempData = state
            tempData[action.payload._id] = action.payload
            return (tempData)
     }
}


export function CargoDataProvider(props: ICargoDataProviderProps) {
    const [state, dispatch] = useReducer(cargoReducer, defaultState)

    return (
        <CargoContext.Provider value={{state, dispatch}}>
                {props.children}
        </CargoContext.Provider>
    )
}


export function useCargoDataContext (){
    const context = useContext(CargoContext)

    if (!context) throw new Error("useCargoContext must be used inside a CargoProvider")

    return context
}