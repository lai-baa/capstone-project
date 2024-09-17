import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { IoChevronForwardOutline } from 'react-icons/io5';
import './Navigation.css';
import { useNav } from '../../context/navContext';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { navOpen, toggleNav } = useNav();  // Access the nav context

  return (
    <ul className="nav-links-container">
      {sessionUser && !navOpen && ( // Only show the toggle open button when the sidebar is closed
        <button onClick={toggleNav} className="toggle-button">
          <IoChevronForwardOutline />
        </button>
      )}

      <li id="nav-link-home">
        <NavLink to="/">
          <img src="/favicon.ico" alt="KayKewNotes" className="nav_icon" />
        </NavLink>
      </li>

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
