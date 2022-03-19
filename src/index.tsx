import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WindowProvider } from './context/window-context';
import { SelectedTransportProvider } from './context/selected-transport-context';
import { CargoDataProvider } from './context/cargo-data-context';
import { CargoWindowProvider } from './context/cargo-window-context';

ReactDOM.render(
  <React.StrictMode>
    <WindowProvider>
      <SelectedTransportProvider>
        <CargoDataProvider>
          <CargoWindowProvider>
            <App />
          </CargoWindowProvider>
        </CargoDataProvider>
      </SelectedTransportProvider>
    </WindowProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
