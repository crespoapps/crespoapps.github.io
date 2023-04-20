import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'

const start = document.referrer.replace(window.location.href, '')
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App start={start} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
