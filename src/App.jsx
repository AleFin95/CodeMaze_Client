import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { PageWrapper } from './components'
import * as Pages from './pages'

function App() {

  return (
    <>
      <header id='header'>
        <PageWrapper />
      </header>
      <Routes>
        <Route path="/" element={< Pages.HomePage/>}/>
        <Route path="/login" element={< Pages.LoginPage/>}/>     
        <Route path="/games" element={< Pages.GamesPage/>}/>     
        <Route path="/ranking" element={< Pages.RankingPage/>}/>     
      </Routes>
    </>
  )
}

export default App
