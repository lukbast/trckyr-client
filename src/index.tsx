import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WindowProvider } from './context/window-context';
import { SelectedTransportProvider } from './context/selected-transport-context';
import { CargoDataProvider } from './context/cargo-data-context';

ReactDOM.render(
  <React.StrictMode>
    <WindowProvider>
      <SelectedTransportProvider>
        <CargoDataProvider>
          <App />
        </CargoDataProvider>
      </SelectedTransportProvider>
    </WindowProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
