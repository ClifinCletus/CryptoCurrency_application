import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
import 'antd/dist/reset.css'; // Import Ant Design styles to style the entire application
import {Provider} from 'react-redux';
import {store} from './app/store'; // Import the Redux store


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}> {/* Provide the Redux store to the application  and hence any component or file can access the data from store (the api data for here)*/}
      <App />
      </Provider>
    </Router>
    
  </React.StrictMode>,
)
