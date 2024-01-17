import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/App.css';
import { SignUpComponent, Video } from '../../components';
import { useAuth } from '../../contexts';
import './index.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(true);
  const navigateTo = useNavigate();
  const { updateAccessToken, setAvatar } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      };
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(
        'https://codemaze-api.onrender.com/auth/login',
        options
      );

      if (response.status === 200) {
        const { access_token } = await response.json();
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('username', username);

        await fetchUserAvatar(access_token);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'You have successfully logged in'
        });
        navigateTo('/profile');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      });
    }
  };

  function handleSignUpClick() {
    setShowLogIn(!showLogIn);
    setShowSignUp(!showSignUp);
  }

  const fetchUserAvatar = async (access_token) => {
    try {
      const avatarResponse = await fetch(
        'https://codemaze-api.onrender.com/users/profile',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
      );

      if (avatarResponse.ok) {
        const avatarData = await avatarResponse.json();
        setAvatar(avatarData.avatar);
      } else {
        console.error('Failed to fetch avatar:', avatarResponse.statusText);
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  };

  return (
    <>
      <Video />
      <div className='loginPage'>
        <div className='loginHeader'>
          <h1>CODEMAZE</h1>
        </div>
        {showLogIn && (
          <>
            <div className='login'>
              <form className='loginForm' onSubmit={handleSubmit}>
                <input
                  type='text'
                  value={username}
                  required
                  placeholder='username'
                  autoComplete='off'
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type='password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='password'
                  autoComplete='off'
                ></input>
                <input type='submit' value='Log in' className='login-button' />
                <p>
                  No account?
                  <button
                    type='button'
                    className='login-button'
                    onClick={handleSignUpClick}
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </>
        )}
        {showSignUp && (
          <SignUpComponent handleSignUpClick={handleSignUpClick} />
        )}
      </div>
    </>
  );
};

export default LoginPage;
