import { useState } from 'react'
import reactLogo from './assets/react.svg'
import OrgChartCanvas from './components/OrgChart/OrgChartCanvas'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'

function App() {


  return (
    <Router >
      <Routes basename="/orgChart">
        <Route path="/orgChart/:projectCode" element={<OrgChartCanvas />} />
      </Routes>
    </Router>
  )
}

export default App
