import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/App.css';
import './index.css';
import { SignUpComponent } from '../../components';
import { useAuth } from '../../contexts';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(true);
  const navigateTo = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      };

      const response = await fetch(
        'https:',
        options
      );

      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        setToken(token);

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
        navigateTo('/');
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
  return (
    <div className='loginPage'>
    <div className='loginHeader'>
      <h1>Codemaze</h1>
    </div>
    {showLogIn && (
      <>
        <div className='login'>
          <h2>Log In</h2>
          <form className='loginForm' onSubmit={handleSubmit}>
            <input
              type='text'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='email'
              autoComplete='off'
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
    {showSignUp && <SignUpComponent handleSignUpClick={handleSignUpClick} />}
  </div>
);
};

export default LoginPage