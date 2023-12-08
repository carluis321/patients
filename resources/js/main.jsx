import React from 'react'
import ReactDOM from 'react-dom/client'
import Nav from '../components/Nav.jsx'
import Content from '../components/Content.jsx'
import './../css/app.css'

import * as _ from './bootstrap.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="container mx-auto bg-gray-50 p-5 h-full">
      <Content />
    </div>
  </React.StrictMode>,
)
