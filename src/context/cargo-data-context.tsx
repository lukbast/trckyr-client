import { createContext, useReducer, useContext, ReactNode } from "react";
import { ICargoData } from "../interfaces";

const defaultState = {
    data : [
        {_id: 0,
        name: "Chocolate bars",
        weight: 10000,
        weightUnit: "kg",
        quantity: 1000000,
        quantityUnit: "pcs",
        info: "" },
        {_id: 1,
        name: "Cars",
        weight: 20000,
        weightUnit: "kg",
        quantity: 6,
        quantityUnit: "pcs",
        info: "" },
        {_id: 2,
        name: "Windows",
        weight: 8000,
        weightUnit: "kg",
        quantity: 1000,
        quantityUnit: "pcs",
        info: "Fragile" },
    ]
}

export type State  = typeof defaultState

export enum ActionTypes {
    "ADD_CARGO",
    "DELETE_CARGO"
}

interface IAction{
    type: ActionTypes,
    payload: ICargoData
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
        case ActionTypes.ADD_CARGO:
            const newData = state.data
            newData.push(action.payload)
            return({...state,
                data: newData
            })
        case ActionTypes.DELETE_CARGO:
            const cleanedData = []
            let i = 0
            for (i; i < action.payload._id;  i++){
                cleanedData.push(state.data[i])
            }
            i ++;
            for (i; i < state.data.length;  i++){
                const shiftedObject = state.data[i]
                shiftedObject._id = i - 1
                cleanedData.push(shiftedObject)
            }
            return {...state,
            data: cleanedData}

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