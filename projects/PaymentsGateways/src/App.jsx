import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import FrontEnd from './FrontEnd.jsx'
// import Backend from './Backend.java'

// main class that contains all the application logic.
function App() {
  return (
    <div className='app'>
      <div className="container">
        <h1>Payments Gateways</h1>
        <p>This is a project to learn about payment gateways.</p>
        <p>I'm going to use Stripe as payment gateway.</p>
        <p>Also going to use React for the frontend and Java for the backend.</p>
        <p>And finally Vite as the build tool.</p>
      </div>

      <FrontEnd />

    </div>
  )
}

export default App
