import { createContext, useReducer, useContext, ReactNode } from "react";

const defaultState = {
    showSelected: true,
    showEdit: false,
    showNew: false,
    selected: 0
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


interface IDriversWindowContext {
    state: State,
    dispatch: React.Dispatch<IAction>
}

interface IDriversWindowProviderProps{
    children: ReactNode
}

const DriversWindowContext = createContext<IDriversWindowContext>({state: defaultState, dispatch: () => undefined})

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

export function DriversWindowProvider(props: IDriversWindowProviderProps) {
    const [state, dispatch] = useReducer(cargoWindowReducer, defaultState)

    return (
        <DriversWindowContext.Provider value={{state, dispatch}}>
                {props.children}
        </DriversWindowContext.Provider>
    )
}


export function useDriversWindowContext (){
    const context = useContext(DriversWindowContext)

    if (!context) throw new Error("useDriversWindowContext must be used inside a DriversWindowProvider")

    return context
}