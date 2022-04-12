import { FC } from "react"

import { WindowProvider } from './window-context';
import { SelectedTransportProvider } from './selected-transport-context';
import { UserProvider } from './user-context/user-context';
import { DataProvider } from "./data-context";

interface IContextProviderProps {
    children : any
}

const ContextProvider:FC<IContextProviderProps> = ({children}):JSX.Element =>{
    return(
        <WindowProvider>
            <SelectedTransportProvider>
                <DataProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                </DataProvider>
            </SelectedTransportProvider>
        </WindowProvider>
    )
}




export default ContextProvider