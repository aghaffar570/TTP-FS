import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './components/providers/AuthContext'
import { TradeProvider } from './components/providers/TradeContext'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Router>
    <AuthProvider>
      <TradeProvider>
        <App />
      </TradeProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root'))


serviceWorker.unregister()
