import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connexion from './pages/Connexion/Connexion'
import Inscription from './pages/Inscription/Inscription';
import Mdpo from './pages/Mdpo/Mdpo';
import Rejoindre from './pages/Rejoindre/Rejoindre';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Connexion/>}/>
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/inscription" element={<Inscription/>} />
        <Route path="/motdepasseoublié?" element={<Mdpo/>} />
        <Route path='/rejoindre' element={<Rejoindre/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
