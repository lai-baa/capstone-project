import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const newErrors = {};
    if (credential.length < 4) {
      newErrors.credential = 'Username must be at least 4 characters';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          } else {
            setErrors({ credential: 'The provided credentials were invalid.' });
          }
        });
    }
  };

  const handleSubmitDemo = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(
      sessionActions.login({ credential: 'khj1107', password: '8makes1team' })
    ).then(closeModal);
  };

  return (
    <div className='login-wrapper'>
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className='error-message'>{errors.credential}</p>
        )}
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p className='error-message'>{errors.password}</p>
        )}
        <button
          className='login-button'
          type='submit'
          disabled={Object.keys(errors).length > 0}
        >
          Log In
        </button>
        <button
          className='demo-login-button'
          onClick={handleSubmitDemo}
        >
          Log In as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;