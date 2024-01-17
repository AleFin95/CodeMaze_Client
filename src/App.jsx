import React from "react";
import "./assets/App.css";
import { Routes, Route } from "react-router-dom";
import { PageWrapper } from "./components";
import * as Pages from "./pages";
import ProtectedRoute from "./routes";
import { SignUpComponent } from "./components";
import { AuthProvider } from "./contexts";

function App() {
  return (
    <>
      <AuthProvider>
        <header id="header">
          <PageWrapper />
        </header>
        <Routes>
          <Route path="/" element={<Pages.HomePage />} />
          <Route path="/login" element={<Pages.LoginPage />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/game" element={<Pages.GamePage />} />
          <Route path="/ranking" element={<Pages.RankingPage />} />
          <Route path="/profile" element={<Pages.ProfilePage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
