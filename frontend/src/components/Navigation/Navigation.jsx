import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'; // Import both icons
import './Navigation.css';
import { useNav } from '../../context/navContext';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { navOpen, toggleNav } = useNav(); // Access navOpen and toggleNav from context

  return (
    <ul className="nav-links-container">
      {sessionUser && ( // Always show the toggle button when logged in
        <button onClick={toggleNav} className={`toggle-button ${navOpen ? 'open' : 'closed'}`}>
          {navOpen ? <IoChevronBackOutline /> : <IoChevronForwardOutline />}
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