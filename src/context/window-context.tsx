import { createContext, useReducer, useContext, ReactNode } from "react";


const defaultState = {
    transportWindow: true,
    editTransportWindow: false,
    newTransportWindow : false,
    newDriverWindow: false,
    newCargo: false,
    selectedButton:  ""
}
export const enum selectedButtons{ "cargo","transport", "drivers", "none"}
export type Action = "openTransport" | "openNewTransport" | "openManageDrivers" | "openManageCargos" | "openEditTransport"
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
                editTransportWindow: false,
                newTransportWindow : false,
                newDriverWindow: false,
                newCargo: false,
                selectedButton: "none"
            }
        case "openNewTransport":
            return{
                transportWindow: false,
                editTransportWindow: false,
                newTransportWindow : true,
                newDriverWindow: false,
                newCargo: false,
                selectedButton: "transport"
            }
        case "openManageDrivers":
            return {
                transportWindow: false,
                editTransportWindow: false,
                newTransportWindow : false,
                newDriverWindow: true,
                newCargo: false,
                selectedButton: "driver"
            }
        case "openManageCargos":
            return{
                transportWindow: false,
                editTransportWindow: false,
                newTransportWindow : false,
                newDriverWindow: false,
                newCargo: true,
                selectedButton: "cargo"
            }
        case "openEditTransport":
            return{
                transportWindow: false,
                editTransportWindow: true,
                newTransportWindow : false,
                newDriverWindow: false,
                newCargo: false,
                selectedButton: "none"
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