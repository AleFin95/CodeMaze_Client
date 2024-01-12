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
          <Route path="/test" element={<Pages.TestPage />} />
          <Route path="/test2" element={<Pages.TestPage2 />} />
          <Route path="/test3" element={<Pages.TestPage3 />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
