import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { UserContextProvider } from "./context/UserContext";

function App() {
  const title = "Welcome to the chat";

  return (
    <>
      <UserContextProvider>
        <Header title={title} />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
