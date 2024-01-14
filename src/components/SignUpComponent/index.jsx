import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SignUpComponent = ({ handleSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistrationSuccessful, setRegistrationSuccessful] = useState(false);

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

      const response = await fetch(
        'https://codemaze-api.onrender.com/auth/register',
        options
      );

      const data = await response.json();

      if (response.status === 201 || response.status === 200 ) {
        setRegistrationSuccessful(true);
        handleSignUpClick();
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
          title: 'You have registered'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Registration error: ${data.error}`
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      });
    }
  };
  return (
    <>
      {!isRegistrationSuccessful && (
        <div className='login'>
          <h2>Register Here !</h2>
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
              placeholder='password'
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type='submit' value='Register' className='login-button' />
            <p>
              Got an account?
              <button
                type='button'
                className='login-button'
                onClick={handleSignUpClick}
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      )}
      {isRegistrationSuccessful && (
        <p>Account successfully created! You can Log In !</p>
      )}
    </>
  );
};

export default SignUpComponent;
