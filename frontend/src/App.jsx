import React from 'react'
import { Routes,Route } from "react-router-dom";
import Landing from './pages/Landing';
import Building from './components/Building';
import Register from './pages/Register';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Landing />}/>
        <Route path='/building' element = {<Building />}/>
        <Route path='/register' element = {<Register />}/>
      </Routes>
    </div>
  )
}

export default App