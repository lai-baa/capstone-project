import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';
import './Navigation.css';
import { useNav } from '../../context/navContext';
import { searchNotesByTag, clearSearchResults } from '../../store/note'; 

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { navOpen, toggleNav } = useNav();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async () => {
    if (searchTerm.trim()) {
      try {
        // Dispatch search action and wait for the results
        const result = await dispatch(searchNotesByTag(searchTerm.trim()));
        console.log("Dispatched search result:", result);

        // Navigate only after search results are received and state is updated
        navigate('/search-results');
      } catch (error) {
        console.error('Search error:', error);
        dispatch(clearSearchResults());
        navigate('/search-results'); // Navigate anyway to show "No results" message
      }
    } else {
      // If search term is empty, clear the results
      dispatch(clearSearchResults());
      navigate('/search-results');
    }
  };

  const handleLogoClick = () => {
    setSearchTerm('');
    navigate('/');
  };

  return (
    <ul className="nav-links-container">
      {sessionUser && (
        <button onClick={toggleNav} className={`toggle-button ${navOpen ? 'open' : 'closed'}`}>
          {navOpen ? <IoChevronBackOutline /> : <IoChevronForwardOutline />}
        </button>
      )}

      <li id="nav-link-home">
        <NavLink to="/" onClick={handleLogoClick}>
          <img src="/favicon.ico" alt="KayKewNotes" className="nav_icon" />
        </NavLink>
      </li>

      {sessionUser && (
        <li className="search-bar">
          <input
            id="search-input"
            type="text"
            placeholder="Search by tags..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id="search-button" onClick={handleSearchSubmit}>
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