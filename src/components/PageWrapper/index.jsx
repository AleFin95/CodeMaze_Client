import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import './index.css';

const PageWrapper = () => {
  const { selectedAvatar } = useAuth();
  const navigate = useNavigate();

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#4bf275' : 'rgb(215, 226, 89)',
    textDecoration: 'none',
    padding: '10px 15px',
    fontSize: '30px',
    fontFamily: 'Courier New',
    fontWeight: isActive ? 'regular' : 'regular',
    borderBottom: isActive ? '3px solid #4bf275' : ' transparent',
    borderRadius: '8px',
    transition: 'color 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer'
  });

  const h1Style = ({ isActive }) => ({
    color: isActive ? '#4bf275' : 'rgb(215, 226, 89)',
    textDecorationColor: isActive ? '#4bf275' : ' transparent',
    textDecorationThickness: '2px', // Set the thickness of the underline
    borderRadius: '8px',
    textDecoration: 'none'
  });

  const isLoggedIn = !!localStorage.getItem('access_token');
  //const isAdmin = localStorage.getItem("isAdmin") === "true";

  document.body.classList.toggle('logged-in', isLoggedIn);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    //localStorage.removeItem("isAdmin");
    navigate('/');
  };

  const button = {
    backgroundColor: '#7df59b',
    border: 'solid 5px #1e943b',
    outline: 'none',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontFamily: "'Lemon', serif",
    borderRadius: '40px',
    boxShadow:
      '0px 4px 6px rgba(0, 0, 0, 0.1)' /* Adding a subtle shadow for depth ,
     /*transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; */
  };

  return (
    <header style={{ marginBottom: '20px' }}>
      <nav>
        <div data-testid='div' className='onlyNavs'>
          <NavLink to='/' style={h1Style}>
            <h1>CODEMAZE</h1>
          </NavLink>
          {isLoggedIn ? (
            <>
              <div className='avatar-logout'>
                <div className='avatar-btn'>
                  {selectedAvatar && (
                    <NavLink to='/profile'>
                      <img
                        src={selectedAvatar}
                        alt='Selected Avatar'
                        className='avatar selected'
                        style={{
                          borderRadius: '50%',
                          width: '80px',
                          height: '80px',
                          marginBottom: '0px'
                        }}
                      />
                    </NavLink>
                  )}
                </div>
                <div className='logout-profile'>
                  <NavLink
                    to='/'
                    onClick={handleLogout}
                    id='logoutid'
                    data-testid='button1'
                    style={button}
                    className='button1'
                  >
                    Logout
                  </NavLink>
                </div>
              </div>
            </>
          ) : (
            <NavLink
              to='/login'
              data-testid='button1'
              id='logoutid'
              style={button}
              className='button1'
            >
              Join us
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default PageWrapper;
