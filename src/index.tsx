import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WindowProvider } from './context/window-context';
import { SelectedTransportProvider } from './context/selected-transport-context';
import { CargoProvider } from './context/cargo-context';

ReactDOM.render(
  <React.StrictMode>
    <WindowProvider>
      <SelectedTransportProvider>
        <CargoProvider>
          <App />
        </CargoProvider>
      </SelectedTransportProvider>
    </WindowProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
