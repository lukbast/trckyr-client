import { createContext, useReducer, useContext, ReactNode } from "react";


const defaultState = {
    index: 0
}

export type Action = "changeTransport"
export type State  = typeof defaultState
export type Payload = number

interface ISelectedTransportContext {
    state: typeof defaultState,
    dispatch: any // TODO change to correct type
}

interface ISelectedTransportContextProps {
    children: ReactNode
}

const SelectedTransportContext = createContext<ISelectedTransportContext>({state: defaultState, dispatch: () => {}})

function selectedTransportReducer (state: State, payload: number) {
     return {index: payload}
}

export function SelectedTransportProvider(props: ISelectedTransportContextProps) {
    const [state, dispatch] = useReducer(selectedTransportReducer, defaultState)

    return (
        <SelectedTransportContext.Provider value={{state, dispatch}}>
                {props.children}
        </SelectedTransportContext.Provider>
    )
}

export function useSelectedTransport (){
    const context = useContext(SelectedTransportContext)

    if (!context) throw new Error("useSelectedTransport must be used inside a SelectedTransportProvider")

    return context
}