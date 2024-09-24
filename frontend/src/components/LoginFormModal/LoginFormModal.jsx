import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { closeModal } = useModal();

  const validate = () => {
    const newErrors = {};
    if (credential.length < 4) {
      newErrors.credential = 'Username must be at least 4 characters';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {/* Show errors only after the form is submitted */}
        {isSubmitted && errors.credential && (
          <p className="error-message">{errors.credential}</p>
        )}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {isSubmitted && errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
        <button
          className="login-button"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Log In
        </button>
        <button className="demo-login-button" onClick={handleSubmitDemo}>
          Log In as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;