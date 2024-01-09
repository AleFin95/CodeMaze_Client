import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { PageWrapper } from './components'
import { HomePage } from './pages/HomePage/HomePage'

function App() {

  return (
    <>
      <header id='header'>
        <PageWrapper />
      </header>
      <Routes>
        <Route path="/" element={< HomePage/>}/>   
      </Routes>
    </>
  )
}

export default App
