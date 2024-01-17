import React from "react";
import "./index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import AvatarSelector from "../AvatarSelector";

const PageWrapper = () => {
  const { selectedAvatar } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    //localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <header style={{ marginBottom: "20px" }}>
      <nav>
        <NavLink to="/" style={h1Style}>
          <h1>CODEMAZE</h1>
        </NavLink>
        <div data-testid="div" className="onlyNavs">
          {isLoggedIn ? (
            <>
              <div className="avatar-logout">
                <div className="avatar-btn">
                  {selectedAvatar && (
                    <NavLink to="/profile">
                      <img
                        src={selectedAvatar}
                        alt="Selected Avatar"
                        className="avatar selected"
                        style={{
                          borderRadius: "50%",
                          width: "80px",
                          height: "80px",
                        }}
                      />
                    </NavLink>
                  )}
                </div>
                <div className="logout-profile">
                  <NavLink to="/" onClick={handleLogout} id="logoutid">
                    Logout
                  </NavLink>
                </div>
              </div>
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
