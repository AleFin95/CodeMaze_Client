import React from "react";
import "./index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import AvatarSelector from "../AvatarSelector";

const PageWrapper = () => {
  const { selectedAvatar } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    //localStorage.removeItem("isAdmin");
    navigate("/");
  };
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#4bf275" : "rgb(215, 226, 89)",
    textDecoration: "none",
    padding: "10px 15px",
    fontSize: "30px",
    fontFamily: "Courier New",
    fontWeight: isActive ? "regular" : "regular",
    borderBottom: isActive ? "3px solid #4bf275" : " transparent",
    borderRadius: "8px",
    transition: "color 0.3s ease, background-color 0.3s ease",
    cursor: "pointer",
  });

  const h1Style = ({ isActive }) => ({
    color: isActive ? "#4bf275" : "rgb(215, 226, 89)",
    textDecorationColor: isActive ? "#4bf275" : " transparent",
    textDecorationThickness: "2px", // Set the thickness of the underline
    borderRadius: "8px",
    textDecoration: "none",
  });

  const isLoggedIn = !!localStorage.getItem("access_token");
  //const isAdmin = localStorage.getItem("isAdmin") === "true";

  document.body.classList.toggle("logged-in", isLoggedIn);

  return (
    <header style={{ marginBottom: "20px" }}>
      <nav>
        <NavLink to="/" style={h1Style}>
          <h1>CODEMAZE</h1>
        </NavLink>
        <div data-testid="div" className="onlyNavs">
          <NavLink to="/ranking" style={linkStyle}>
            Ranking
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/" onClick={handleLogout} style={linkStyle}>
                Logout
              </NavLink>
              {selectedAvatar && (
                <NavLink to="/profile">
                  <img
                    src={selectedAvatar}
                    alt="Selected Avatar"
                    className="avatar selected"
                    style={{
                      marginLeft: "-30px",
                      marginRight: "20px",
                      borderRadius: "50%",
                      width: "60px",
                      height: "60px",
                    }}
                  />
                </NavLink>
              )}
            </>
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
