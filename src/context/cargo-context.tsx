import { createContext, useReducer, useContext, ReactNode } from "react";
import { ICargoData } from "../interfaces";

const defaultState = {
    data : [
        {name: "Chocolate bars",
        weight: 10000,
        weightUnit: "kg",
        quantity: 1000000,
        quantityUnit: "pcs",
        info: "" },
        {name: "Cars",
        weight: 20000,
        weightUnit: "kg",
        quantity: 6,
        quantityUnit: "pcs",
        info: "" },
        {name: "Windows",
        weight: 8000,
        weightUnit: "kg",
        quantity: 1000,
        quantityUnit: "pcs",
        info: "Fragile" },
    ]
}

export type State  = typeof defaultState

export enum ActionTypes {
    "ADD_CARGO"
}

interface IAction{
    type: ActionTypes,
    payload: ICargoData
}

interface ICargoContext {
    state: State,
    dispatch: React.Dispatch<IAction>

}

interface ICargoProviderProps{
    children: ReactNode
}


const CargoContext = createContext<ICargoContext>({state: defaultState, dispatch: () => undefined})

function cargoReducer (state: State, action: IAction):State {
     switch (action.type){
         case ActionTypes.ADD_CARGO:
             const newData = state.data
             newData.push(action.payload)
             return({...state,
                data: newData
            })
     }
}


export function CargoProvider(props: ICargoProviderProps) {
    const [state, dispatch] = useReducer(cargoReducer, defaultState)

    return (
        <CargoContext.Provider value={{state, dispatch}}>
                {props.children}
        </CargoContext.Provider>
    )
}


export function useCargoContext (){
    const context = useContext(CargoContext)

    if (!context) throw new Error("useCargoContext must be used inside a CargoProvider")

    return context
}