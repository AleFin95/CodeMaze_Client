import React, { useState, useEffect } from "react";
import "./index.css";
import { useAuth } from "../../contexts";
import { NavLink, useNavigate } from "react-router-dom";
import { AvatarModal, ProfileInfo, ProgressBar } from "../../components";
import profileImage from "./assets/game.png";

const ProfilePage = () => {
  const { selectedAvatar, setAvatar } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    id: null,
    username: "",
    xp: 0,
    wins: 0,
    avatar: "string",
    losses: 0,
    rank: [],
    sessions: [],
  });
  const avatars = [
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pepper&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Midnight&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Mittens&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Max&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Oscar&radius=45&backgroundType=solid,gradientLinear",
    "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Sassy&radius=45&backgroundType=solid,gradientLinear",
  ];
  const handleEditAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAvatarSelection = async (avatar) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch(
        "https://codemaze-api.onrender.com/users/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({ avatar }),
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        setAvatar(updatedProfile.avatar);
        setIsModalOpen(false);
      } else {
        console.error("Failed to update avatar:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };

        const response = await fetch(
          "https://codemaze-api.onrender.com/users/profile",
          options
        );

        if (response.status === 200) {
          const data = await response.json();
          setProfileInfo(data);
          console.log(data);
        } else {
          throw new Error("Failed to fetch profile info");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    //localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <>
      <div className="profilepage">
        <div>
          <div className="profile-container">
            <div className="avatar-section">
              {selectedAvatar && (
                <img
                  src={selectedAvatar}
                  alt="Selected Avatar"
                  className="avatar"
                />
              )}

              <button
                className="edit-avatar-btn"
                onClick={handleEditAvatarClick}
              >
                Edit Avatar
              </button>
              <div className="logout-profile">
                {isLoggedIn ? (
                  <>
                    <NavLink to="/" onClick={handleLogout} id="logoutid">
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <NavLink to="/login">Login/Register</NavLink>
                )}
              </div>
            </div>

            <AvatarModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              avatars={avatars}
              onSelectAvatar={handleAvatarSelection}
            />

            <div className="user-info">
              <h1>Username: </h1>
              <p>{profileInfo.username}</p>
              {profileInfo.rank.map((rankItem) => {
                const remainingXP = rankItem.max_xp - profileInfo.xp;
                return (
                  <div key={rankItem.id}>
                    <p>{rankItem.name}</p>
                    <ProgressBar
                      currentXP={profileInfo.xp}
                      minXPBronze={0}
                      maxXPBronze={250}
                      minXPSilver={251}
                      maxXPSilver={500}
                      minXPGold={501}
                      maxXPGold={750}
                      minXPlatinum={751}
                      maxXPlatinum={1000}
                    />
                    <p>
                      Remaining XP to {rankItem.name}:{" "}
                      {remainingXP > 0 ? remainingXP : "Reached"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <ProfileInfo
          xp={profileInfo.xp}
          wins={profileInfo.wins}
          losses={profileInfo.losses}
          sessions={profileInfo.sessions}
        />
      </div>
    </>
  );
};

export default ProfilePage;
