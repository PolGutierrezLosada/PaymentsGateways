import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import FrontEnd from './FrontEnd.jsx'
//import PaymentSection from './PaymentSection.jsx'

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PaymentSection from './PaymentSection.jsx'

// main class that contains all the application logic.
function App() {
  // variable that registers the actual url of the page:
  const location = useLocation();

  return (
    <div className='app'>
      {location.pathname === '/' && (
        <div className="container">
          <h1>Payments Gateways</h1>
          <p>This is a project to learn about payment gateways.</p>
          <p>I'm going to use Stripe as payment gateway.</p>
          <p>Also going to use React for the frontend and Java for the backend.</p>
          <p>And finally Vite as the build tool.</p>
          <p>If you want to feel the experience click on some products to be added in the cart for the payment.</p>
        </div>
      )}

        <Routes>
          <Route path="/" element={<FrontEnd />} />          
          <Route path="/cart" element={<PaymentSection />} />
        </Routes>

    </div>
  )
}

export default App