import { createContext, useContext, useState } from 'react';

// Create context
const NavContext = createContext();

// Custom hook to use the context
export const useNav = () => useContext(NavContext);

// Provider component
export const NavProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(true);  // Default to open

  const toggleNav = () => setNavOpen(!navOpen);  // Toggle function for opening/closing the sidebar

  return (
    <NavContext.Provider value={{ navOpen, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
};