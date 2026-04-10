// App.js

import "./styles.css";
import { Route, Routes, Link } from "react-router-dom";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>React Router DOM</h1>

        <nav style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <Link to={"/"}>Home</Link>
          <Link to={"/service"}>Service</Link>
          <Link to={"/login"}>Login</Link>
          <Link to={"/dashboard"}>Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div>Home</div>}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}


// AuthContex.jsx

import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Proctected Routes.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;

// pages - Dashboard, Login , Services 


// Dashboard
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;


// Login 
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogin() {
    login();
    navigate("/dashboard");
  }
  return (
    <div>
      <h1>Login Page</h1>
      <div>
        {isAuthenticated ? (
          <p> You are already logged in</p>
        ) : (
          <button onClick={() => handleLogin()}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Login;


// Services
const Service = () => {
  return (
    <div>
      <h1>Service Page</h1>
    </div>
  );
};

export default Service;
