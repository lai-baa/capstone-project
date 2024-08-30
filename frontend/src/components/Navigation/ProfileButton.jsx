// frontend/src/components/Navigation/ProfileButton.jsx

import { logout } from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem'
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

const ProfileButton = ({user}) => {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()


    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu)
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const closeMenu = () => setShowMenu(false);

    const logoutClick = (e) => {
        e.preventDefault();
        dispatch(logout())
        closeMenu()
        navigate('/')
    };

    const handleManageFavoritesClick = () => {
        closeMenu();
        navigate('/favorites');
    };

    const handleRemindersClick = () => {
        closeMenu();
        navigate('/reminders');
    };

    const dropdownClasses ="profile-dropdown" + (showMenu ? "" : " hidden");
    return (
    <div>
    <button id="toggle-menu-button"
        onClick={toggleMenu}
    >
        <IoMenu />
        <FaCircleUser />
    </button>
    <ul className={dropdownClasses} ref={ulRef}>
        {user ? (
            <>
                <li>Hello, {user.firstName}</li>
                <li>{user.email}</li>
                <hr></hr>
                <button onClick={handleManageFavoritesClick} className="link-style-button">Manage Favorites</button>
                <hr></hr>
                <button onClick={handleRemindersClick} className="link-style-button">Reminders</button>
                <hr></hr>
                <li id="logout">
                    <button onClick={logoutClick}>Log Out</button>
                </li>
            </>
        ) : (
            <>
              <li>
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
              <li>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
            </>
        )}
    </ul>
    </div>
 )
}

export default ProfileButton;
