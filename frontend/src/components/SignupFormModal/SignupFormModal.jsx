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
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [isFormComplete, setIsFormComplete] = useState(false);
  const { closeModal } = useModal();

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = 'Invalid email address.';
    
    if (username.length < 4) newErrors.username = 'Username must be at least 4 characters.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!firstName) newErrors.firstName = 'First Name is required.';
    if (!lastName) newErrors.lastName = 'Last Name is required.';
    
    return newErrors;
  };

  // UseEffect to track if all form fields are filled out
  useEffect(() => {
    if (
      email && 
      username && 
      firstName && 
      lastName && 
      password && 
      confirmPassword
    ) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true); 

    const newErrors = validate(); 
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
  };

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
        {isSubmitted && errors.email && <p className='error-message'>{errors.email}</p>}
        
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {isSubmitted && errors.username && <p className='error-message'>{errors.username}</p>}
        
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {isSubmitted && errors.firstName && <p className='error-message'>{errors.firstName}</p>}
        
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {isSubmitted && errors.lastName && <p className='error-message'>{errors.lastName}</p>}
        
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {isSubmitted && errors.password && <p className='error-message'>{errors.password}</p>}
        
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {isSubmitted && errors.confirmPassword && <p className='error-message'>{errors.confirmPassword}</p>}
        
        <button 
          type='submit' 
          disabled={!isFormComplete} // Disabled if the form isn't complete
          className={!isFormComplete ? 'disabled' : ''}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;