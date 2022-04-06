import { createContext, useReducer, useContext, ReactNode } from "react";
import { User } from "../../interfaces";
 
export const defaultState:User = {
    username: "",
    loggedIn: false
}

export enum UserActions {"LOG IN", "LOG OUT"}
export type State = typeof defaultState

export type Action = {
    type: UserActions,
    payload: User
}

export interface IProviderProps {
    children : ReactNode
}

export interface IContext {
    state: State,
    dispatch: React.Dispatch<Action>
}

const UserContext = createContext<IContext>({state: defaultState, dispatch:() => undefined})

export const userReducer = (state: State, action: Action) => {
    switch (action.type){
        case UserActions["LOG IN"]:
            return action.payload
        case UserActions["LOG OUT"]:
            return defaultState
    }
}

export function UserProvider(props: IProviderProps) {
    const [state, dispatch] = useReducer(userReducer, defaultState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
                {props.children}
        </UserContext.Provider>
    )
}

export function useUser (){
    const context = useContext(UserContext)

    if (!context) throw new Error("useUser must be used inside a UserProvider")

    return context
}