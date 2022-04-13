import { createContext, useReducer, useContext, ReactNode } from "react";

const defaultState = {
    showSelected: true,
    showEdit: false,
    showNew: false,
    selected: 1
}

export type State  = typeof defaultState

export enum ActionTypes {
    "SHOW_SELECTED",
    "SHOW_EDIT",
    "SHOW_NEW"
}

interface IAction{
    type: ActionTypes,
    payload: number
}

interface ICargoWindowContext {
    state: State,
    dispatch: React.Dispatch<IAction>
}

interface ICargoWindowProviderProps{
    children: ReactNode
}

const CargoWindowContext = createContext<ICargoWindowContext>({state: defaultState, dispatch: () => undefined})

function cargoWindowReducer (state: State, action: IAction):State {
    switch (action.type){
        case ActionTypes.SHOW_SELECTED:
            return({
                showSelected: true,
                showEdit: false,
                showNew: false,
                selected: action.payload
            })
            case ActionTypes.SHOW_EDIT:
                return({
                    showSelected: false,
                    showEdit: true,
                    showNew: false,
                    selected: action.payload
            })
            case ActionTypes.SHOW_NEW:
            return({
                showSelected: false,
                showEdit: false,
                showNew: true,
                selected: action.payload
            })
    }
}


export function CargoWindowProvider(props: ICargoWindowProviderProps) {
    const [state, dispatch] = useReducer(cargoWindowReducer, defaultState)

    return (
        <CargoWindowContext.Provider value={{state, dispatch}}>
                {props.children}
        </CargoWindowContext.Provider>
    )
}


export function useCargoWindowContext (){
    const context = useContext(CargoWindowContext)

    if (!context) throw new Error("useCargoWindowContext must be used inside a CargoWindowProvider")

    return context
}