import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/App.css';
import { PageWrapper, SignUpComponent } from './components';
import { AuthProvider } from './contexts';
import './index.css';
import * as Pages from './pages';

function App() {
  return (
    <>
      <AuthProvider>
        <header id='header'>
          <PageWrapper />
        </header>
        <Routes>
          <Route path='/' element={<Pages.HomePage />} />
          <Route path='/login' element={<Pages.LoginPage />} />
          <Route path='/signup' element={<SignUpComponent />} />
          <Route path='/game' element={<Pages.GamePage />} />
          <Route path='/ranking' element={<Pages.RankingPage />} />
          <Route path='/profile' element={<Pages.ProfilePage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
