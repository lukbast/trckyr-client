import { createContext, useReducer, useContext, ReactNode } from "react";

const defaultState = {
    transportWindow: true,
    newTransportWindow : false,
    newDriverWindow: false,
    newCargo: false
}

export type Action = "openTransport" | "openNewTransport" | "openNewDriver" | "openNewCargo"
export type State  = typeof defaultState

export interface WindowProviderProps {
    children: ReactNode
}
export interface ICreateContext {
    state : typeof defaultState,
    dispatch: React.Dispatch<Action>
}


const WindowContext = createContext<ICreateContext>({state: defaultState, dispatch: () => {}})

function windowReducer (state: State, action: Action) {
    switch(action){
        case "openTransport":
            return {
                transportWindow: true,
                newTransportWindow : false,
                newDriverWindow: false,
                newCargo: false
            }
        case "openNewTransport":
            return{
                transportWindow: false,
                newTransportWindow : true,
                newDriverWindow: false,
                newCargo: false
            }
        case "openNewDriver":
            return {
                transportWindow: false,
                newTransportWindow : false,
                newDriverWindow: true,
                newCargo: false
            }
        case "openNewCargo":
            return{
                transportWindow: false,
                newTransportWindow : false,
                newDriverWindow: false,
                newCargo: true
            }
    }
}

export function WindowProvider(props: WindowProviderProps) {
    const [state, dispatch] = useReducer(windowReducer, defaultState)

    return (
        <WindowContext.Provider value={{state, dispatch}}>
                {props.children}
        </WindowContext.Provider>
    )
}

export function useWindowState(){
    const context = useContext(WindowContext)

    if (!context) throw new Error("useWindowState must be used inside a WindowProvider")

    return context
}