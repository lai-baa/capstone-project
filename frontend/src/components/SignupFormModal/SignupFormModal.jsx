// frontend/src/components/SignupFormPage/SignupFormPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal.jsx';
import { signup } from '../../store/session.js';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = 'Invalid email address.';
    
    if (username.length < 4) newErrors.username = 'Username must be at least 4 characters.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!firstName) newErrors.firstName = 'First Name is required.';
    if (!lastName) newErrors.lastName = 'Last Name is required.';
    
    setErrors(newErrors);
  }, [email, username, password, confirmPassword, firstName, lastName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      const payload = {
        username,
        firstName,
        lastName,
        email,
        password
      }

      dispatch(signup(payload))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
  }

  return (
    <div className='sign-up-div'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p className='error-message'>{errors.email}</p>}
        
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p className='error-message'>{errors.username}</p>}
        
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {errors.firstName && <p className='error-message'>{errors.firstName}</p>}
        
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {errors.lastName && <p className='error-message'>{errors.lastName}</p>}
        
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p className='error-message'>{errors.password}</p>}
        
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
        
        <button 
          type='submit' 
          disabled={Object.keys(errors).length > 0}
          className={Object.keys(errors).length > 0 ? 'disabled' : ''}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
