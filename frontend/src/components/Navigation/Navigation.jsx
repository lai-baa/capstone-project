import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user); // Check if the user is logged in

  return (
    <ul className='nav-links-container'>
      <li id="nav-link-home">
        <NavLink to="/">
        <img src="/favicon.ico" alt="KayKewNotes" className="nav_icon" />
        </NavLink>
      </li>

      {sessionUser && ( // Only render these links when the user is logged in
        <div className='nav-links'>
          <Link to="/notebooks" className="nav-link">All Notebooks</Link>
          <Link to="/tasks" className="nav-link">Pending Tasks</Link>
          <Link to="/reminders" className="nav-link">Reminders</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/tasks/completed" className="nav-link">Completed Tasks</Link>
        </div>
      )}

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;