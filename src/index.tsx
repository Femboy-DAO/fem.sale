import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'wagmi'
import { connectors, provider, webSocketProvider } from './config'
import App from './App'
import "./index.css";
import "./slides.css";


ReactDOM.render(
  <React.StrictMode>
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
