import React from "react";
import "./index.css"
import { NavLink, useNavigate } from "react-router-dom";

const PageWrapper = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    //localStorage.removeItem("isAdmin");
    navigate("/");
  };
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#2B061E" : "#4A4A4A",
    textDecoration: "none",
    padding: "10px 15px",
    fontSize: "22px",
    fontWeight: isActive ? "bold" : "normal",
  });

  const isLoggedIn = !!localStorage.getItem("token");
  //const isAdmin = localStorage.getItem("isAdmin") === "true";
 
  return (
    <header style={{ marginBottom: "20px" }}>
     <nav>
     <h1>CODEMAZE</h1>
        {!isLoggedIn && (
            <NavLink to="/" style={linkStyle}>
                Home
            </NavLink>
        )}
            <NavLink to="/games" style={linkStyle}>
                Games
            </NavLink>
            <NavLink to="/ranking" style={linkStyle}>
                Ranking
            </NavLink>
        {isLoggedIn && (
            <NavLink to="/profile" style={linkStyle}>
                Profile
            </NavLink>
        )}
        {isLoggedIn ? (
            <NavLink to="/" onClick={handleLogout} style={linkStyle}>
                Logout
            </NavLink>
        ) : (
            <NavLink to="/login" style={linkStyle}>
                Login/Register
            </NavLink>
        )}
      </nav>
    </header>
  );
};

export default PageWrapper;
