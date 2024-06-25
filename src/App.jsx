import React from 'react'
import LandingPage from './vendorDashbord/pages/LandingPage'
import "./App.css"
import { Route, Routes } from 'react-router-dom'
import PageNotfound from './vendorDashbord/components/PageNotfound'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/'  element={ <LandingPage/>}/>
      <Route path='/*' element={<PageNotfound/>}/>
    </Routes>
    </div>
  )
}

export default App
