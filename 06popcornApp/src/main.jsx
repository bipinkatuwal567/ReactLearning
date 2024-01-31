import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import StarRating from './components/StarRating'
import App from './App.jsx'
import App_v1 from './App_v1.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App_v1 />
    {/* <StarRating maxRating={5} messages={["Poor", "Good", "Very Good", "Great", "Excellent"]} /> */}
    {/* <StarRating maxRating={5} color='#0f56f9' size={28} className="test" defaultRating={3} /> */}
    {/* <Test /> */}
  </React.StrictMode>,
)
