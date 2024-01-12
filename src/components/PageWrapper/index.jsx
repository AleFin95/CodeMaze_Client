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
    color: isActive ? "#4bf275" : "#d7e259",
    textDecoration: "none",
    padding: "10px 15px",
    fontSize: "30px", 
    fontFamily: "Courier New",
    fontWeight: isActive ? "bold" : "normal",
    borderBottom: isActive ? "5px solid #4bf275" : "2px solid transparent",
    borderRadius: "8px", 
    transition: "color 0.3s ease, background-color 0.3s ease", 
    cursor: "pointer",
  })

  const isLoggedIn = !!localStorage.getItem("token");
  //const isAdmin = localStorage.getItem("isAdmin") === "true";

  document.body.classList.toggle("logged-in", isLoggedIn);

  return (
    <header style={{ marginBottom: "20px" }}>
     <nav>
     <h1>CODEMAZE</h1>
     <div className="onlyNavs">
        {!isLoggedIn && (
            <NavLink to="/" style={linkStyle}>
                Home
            </NavLink>
        )}
            <NavLink to="/ranking" style={linkStyle}>
                Ranking
            </NavLink>
            <NavLink to="/game" style={linkStyle}>
                Game
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
        </div>
      </nav>
    </header>
  );
};

export default PageWrapper;
