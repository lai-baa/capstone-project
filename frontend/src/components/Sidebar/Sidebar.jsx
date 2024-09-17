import { useNav } from '../../context/navContext';
import { IoChevronBackOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';  // Import the CSS file for styling

function Sidebar({ user }) {
  const { navOpen, toggleNav } = useNav();  // Access the nav context

  return (
    <>
      <div className={`sidebar ${navOpen ? "open" : "closed"}`}>
        {navOpen && ( // Only show close button and links when sidebar is open
          <>
            <button onClick={toggleNav} className="toggle-button">
              <IoChevronBackOutline />
            </button>

            <div className="sidebar-links">
              {user ? (
                <>
                  <NavLink to="/notebooks" className="nav-link">All Notebooks</NavLink>
                  <NavLink to="/tasks" className="nav-link">Pending Tasks</NavLink>
                  <NavLink to="/reminders" className="nav-link">Reminders</NavLink>
                  <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
                  <NavLink to="/tasks/completed" className="nav-link">Completed Tasks</NavLink>
                </>
              ) : (
                <>
                  {/* <NavLink to="/login" className="nav-link">Log In</NavLink>
                  <NavLink to="/signup" className="nav-link">Sign Up</NavLink> */}
                </>
              )
              }
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Sidebar;