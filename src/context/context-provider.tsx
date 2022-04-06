import { FC } from "react"

import { WindowProvider } from './window-context';
import { SelectedTransportProvider } from './selected-transport-context';
import { CargoDataProvider } from './cargo-data-context';
import { DriverDataProvider } from './driver-data-context';
import { TransportDataProvider } from './transport-data-context';
import { UserProvider } from './user-context';

interface IContextProviderProps {
    children : any
}

const ContextProvider:FC<IContextProviderProps> = ({children}):JSX.Element =>{
    return(
        <WindowProvider>
            <SelectedTransportProvider>
                <CargoDataProvider>
                <DriverDataProvider>
                    <TransportDataProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                    </TransportDataProvider>
                </DriverDataProvider>
                </CargoDataProvider>
            </SelectedTransportProvider>
        </WindowProvider>
    )
}




export default ContextProvider