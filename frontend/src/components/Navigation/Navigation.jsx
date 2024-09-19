import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import './Navigation.css';
import { useNav } from '../../context/navContext';
import { searchNotesByTag } from '../../store/note';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { navOpen, toggleNav } = useNav();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      dispatch(searchNotesByTag(searchTerm.trim()));
      navigate('/search-results');
    }
  };

  return (
    <ul className="nav-links-container">
      {sessionUser && (
        <button onClick={toggleNav} className={`toggle-button ${navOpen ? 'open' : 'closed'}`}>
          {navOpen ? <IoChevronBackOutline /> : <IoChevronForwardOutline />}
        </button>
      )}

      <li id="nav-link-home">
        <NavLink to="/">
          <img src="/favicon.ico" alt="KayKewNotes" className="nav_icon" />
        </NavLink>
      </li>

      {sessionUser && (
        <li className="search-bar">
          <input
            type="text"
            placeholder="Search by tags..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>
            <FaSearch />
          </button>
        </li>
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