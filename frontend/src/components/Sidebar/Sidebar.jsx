import { useNav } from '../../context/navContext';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ user }) {
  const { navOpen } = useNav(); // Only need to check navOpen state here

  return (
    <div className={`sidebar ${navOpen ? "open" : "closed"}`}>
      {navOpen && ( // Only render links when the sidebar is open
        <div className="sidebar-links">
          {user ? (
            <>
              <NavLink to="/notebooks" className="nav-link">
                <p className='nav-link-name'>All Notebooks</p>
              </NavLink>
              <NavLink to="/tasks" className="nav-link">
                <p className='nav-link-name'>Pending Tasks</p>
              </NavLink>
              <NavLink to="/reminders" className="nav-link">
                <p className='nav-link-name'>Reminders</p>
              </NavLink>
              <NavLink to="/favorites" className="nav-link">
                <p className='nav-link-name'>Favorites</p>
              </NavLink>
              <NavLink to="/tasks/completed" className="nav-link">
                <p className='nav-link-name'>Completed Tasks</p>
              </NavLink>
            </>
          ) : (
            <>
              {/* Show login/signup links when no user */}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;