// React
import * as React from "react";
import { useContext } from "react";
// React Router
import { Routes, Route } from "react-router-dom";
// Context
import { AuthContext } from "./context/authContext";
// CSS
import "./App.css";
// Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Welcome from "./components/auth/Welcome";
import AppContent from "./components/AppContent";
// Interfaces
import { IAuthContext } from "./interfaces/contextInterfaces";

const App = (): JSX.Element => {
  const authContext = useContext<IAuthContext>(AuthContext);
  return (
    <div className="app-container">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {authContext.getUser() && (
            <Route path="/*" element={<AppContent />} />
          )}
          <Route path="*" element={<Welcome />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
